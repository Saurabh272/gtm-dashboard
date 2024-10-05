#!/bin/bash

# Update package list
apt update

# Install required packages
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Add the Docker repository
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Update package list again
apt update

# Install Docker
apt install -y docker-ce

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Add current user to docker group
usermod -aG docker ${USER}

# Inform user about group changes
echo "You have been added to the docker group. Please log out and log back in for this to take effect."
echo "After logging back in, run this script again to start the Docker containers."

# Check if the script is being run for the first time
if [ ! -f ".docker_installed" ]; then
    # Create a flag file to indicate Docker has been installed
    touch .docker_installed
    echo "Docker and Docker Compose have been installed. Please log out and log back in, then run this script again."
    exit 0
fi

# If we've reached this point, Docker is installed and the user has logged back in
# Start the Docker containers
npm run docker:up

echo "Docker containers are now running. You can stop them with 'npm run docker:down'"