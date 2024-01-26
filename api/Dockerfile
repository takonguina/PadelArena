# Use a base image with Python
FROM python:3.11

# Create the working directory
WORKDIR /api

# Copy necessary files for dependency installation
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the source code into the working directory
COPY . .

# Expose the port on which the API is listening
EXPOSE 3000

# Default command to start the API
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "3000"]