#!/bin/bash
cd /home/kavia/workspace/code-generation/resumecraft-ai-12247-cf20a7c5/resumecraft_ai_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

