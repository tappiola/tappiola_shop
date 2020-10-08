# Setup environment variables with secrets for local development here
# Copy this file as 'secrets.py' and it will be picked up automatically

import os

os.environ['DATABASE_URL'] = 'postgres://<username>:<password>@<hostname>:<port>/<database>'
