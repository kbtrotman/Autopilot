##   API connection Constants
PROTOCOL = "https"
NB_MASTER = "changeme-nbkup"
API_KEY = "A9kdXLmwkG1P4Mxg0P38aOMlNvAw3boGd8X8h-5LCp3_7cwCJbSWIDMXz0xg2RmY"
BASE_URL = PROTOCOL + "://" + NB_MASTER + "/netbackup"
CONTENT_TYPE = "application/vnd.netbackup+json; version=2.0"

#   SQL GLOBAL CONSTANTS
SERVER_NAME = 'tcp:PHX-SQLDB'
DATABASE = 'DataAutopilot'
USER_NAME = 'postgres'
PASSWORD = 'NmUXTm74zR42iJ96'

LOG_PATH = "scripts/logs/"
LOG_FILENAME = "product-workflows.log"

#  Command-line Args
LONG_OPTIONS = ['-client', '-ip', '-serialnum', '-requestor', '-pol', '-schedule', '-sox']
LONG_DESC = ['Client to be added.',
                'IP of client to be added.',
                'Serial Number of client.',
                'Requestors login ID.',
                'Policy type to be added to NBU.',
                'Schedule to be added to NBU.',
                'Boolean, is this sox data, 0 or 1 (True or False).'
                ]