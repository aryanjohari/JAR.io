from typing import Callable, Dict, Tuple
from utils.response import error
from utils.logger import loadLogger

logger = loadLogger(__name__)

class Router:
    def __init__(self):
        self.routes: Dict[Tuple[str, str], Callable] = {}

    def add_route(self, method: str, path: str, handler: Callable) -> None:
        """Add a route mapping (method, path) to a handler function."""
        self.routes[(method.upper(), path)] = handler
        logger.debug(f"Registered route: {method} {path}")

    def route(self, event: dict) -> dict:
        """Match event to a handler and execute it, or return an error."""
        http_method = event.get('httpMethod', '').upper()
        resource = event.get('resource', '')
        path_params = event.get('pathParameters', {}) or {}
        
        # Replace path parameters with their values
        resolved_path = resource
        if path_params:
            for param, value in path_params.items():
                resolved_path = resolved_path.replace(f"{{{param}}}", value)
        
        logger.debug(f"Routing request: {http_method} {resolved_path}")

        # Look for exact match
        handler = self.routes.get((http_method, resolved_path))
        if handler:
            return handler(event)

        # Check for parameterized route
        for (method, route_path), handler in self.routes.items():
            if method == http_method and self._match_path(route_path, resolved_path):
                return handler(event)

        logger.debug(f"No route found for: {http_method} {resolved_path}")
        return error(404, f"Route not found: {http_method} {resolved_path}")

    def _match_path(self, route_path: str, request_path: str) -> bool:
        """Check if request path matches a parameterized route."""
        route_parts = route_path.split('/')
        request_parts = request_path.split('/')
        
        if len(route_parts) != len(request_parts):
            return False
        
        for route_part, request_part in zip(route_parts, request_parts):
            if route_part.startswith('{') and route_part.endswith('}'):
                continue
            if route_part != request_part:
                return False
        
        return True