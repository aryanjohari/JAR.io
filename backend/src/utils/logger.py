import logging
import os
import sys
from typing import Optional

LOG_LEVELS = {
    "CRITICAL": logging.CRITICAL,
    "ERROR": logging.ERROR,
    "WARNING": logging.WARNING,
    "INFO": logging.INFO,
    "DEBUG": logging.DEBUG,
    "NOTSET": logging.NOTSET,
}


def loadLogger(name: str, format_string: Optional[str] = None) -> logging.Logger:
    """
    Configure and return a logger with the specified name.

    Level Config:
    Set the log level at function environment
    Resources:
      MyFunction:
          Type: AWS::Serverless::Function
          Properties:
              Handler: app.lambda_handler
              Runtime: python3.9
              Environment:
                  Variables:
                      LOG_LEVEL: DEBUG

    OR

    export LOG_LEVEL=DEBUG
    sam local invoke -e event.json

    JSON Logging:
    If you want CloudWatch logs in JSON format (e.g., for easier parsing), update the format_string to something like:
    format_string = '{"time": "%(asctime)s", "name": "%(name)s", "level": "%(levelname)s", "message": "%(message)s"}'

    Args:
        name: The name of the logger (e.g., __name__ for module-level logging).
        format_string: Optional custom log format. Defaults to a standard format.

    Returns:
        A configured logging.Logger instance.
    """
    logger = logging.getLogger(name)
    log_level_str = os.getenv("LOG_LEVEL", "INFO").upper()
    log_level = LOG_LEVELS.get(log_level_str, logging.INFO)
    logger.setLevel(log_level)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        format_string = format_string or os.getenv(
            "LOG_FORMAT", "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        handler.setFormatter(logging.Formatter(format_string))
        logger.addHandler(handler)
        logger.propagate = False

    return logger
