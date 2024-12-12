
**Deploying Multi-Container Applications with Docker Compose and Kubernetes**

DevOps Assignment


1. **Application Architecture**
The application is composed of three primary components:
    1. **Frontend**
        ◦ Built with React.js and served via Node.js.
        ◦ Listens on port 3000.
        ◦ Communicates with the backend API to fetch data and perform actions.
    2. **Backend**
        ◦ Built with Node.js and Express.
        ◦ Listens on port 5000.
        ◦ Provides an API that interacts with MongoDB to serve data to the frontend.
        ◦ Contains a connection to a MongoDB database.
    3. **Database**
        ◦ A MongoDB database that stores application data.
        ◦ Exposed internally within the Kubernetes cluster, with the MongoDB service accessible via database-service:27017.
        
**2. Deployment Strategy for Docker**

**Containerization Overview:**
This application consists of the following components:
    1. Frontend (React.js application, running on Node.js)
    2. Backend (Node.js API, connecting to MongoDB)
    3. MongoDB (MongoDB database used for data storage)
Each of these components will be containerized in separate Docker containers. The frontend and backend will be built into Docker images and run on a Docker network, allowing the backend to interact with the MongoDB database container.
By using Docker Compose, we can easily deploy and manage a multi-container application. Docker allows you to define each service’s configuration (frontend, backend, and MongoDB) in a docker-compose.yml file and build a consistent environment that can be easily replicated across different environments. This strategy makes it easy to scale, update, and manage the entire application stack in a unified and automated way.

**3. Deployment Strategy using local Kubernetes cluster using Minikube through docker**
    **1. Kubernetes Deployment**
        ◦ The application is deployed on Kubernetes using Deployment and Service resources for both frontend and backend components.
        ◦ The backend is connected to MongoDB through a Kubernetes service named database-service, while the frontend communicates with the backend via its exposed service endpoint.
    **2. Services**
        ◦ Frontend Service: Exposed as a ClusterIP service on port 80, routing traffic to the frontend container's port 3000.
        ◦ Backend Service: Exposed as a ClusterIP service on port 5000, routing traffic to the backend container's port 5000.
        ◦ MongoDB Service: A ClusterIP service internally connects the backend to the MongoDB database on port 27017.
    **3. Pod Management**
        ◦ Each service (frontend, backend, and database) is managed using Kubernetes Pods, ensuring high availability and ease of scaling.
    **4. Environment Variables**
        ◦ Frontend: The REACT_APP_BASE_URL environment variable is set to the backend service endpoint (http://backend-service:5000/api).
        ◦ Backend: The DB environment variable is set to the MongoDB service URL (mongodb://database-service:27017/techdome).

**4. Instructions for Building, Deploying, and Managing the Application**

1. **Prerequisites**
*Ensure you have the following tools installed and configured on your system:*
    • Docker
    • Docker Compose
    • Docker Hub account
    • Log in to Docker Hub:
    • Minikube (for local Kubernetes cluster)
    • Kubernetes command-line tool (kubectl)
    
**2. Task Overview**
The assignment requires deploying a multi-container application consisting of:
    • Frontend: React-based application.
    • Backend: Node.js application.
    • Database: MongoDB for storage.
Also,
Build Docker images for the frontend and backend using the provided Dockerfiles.
Push the images to Docker Hub.
Use these images in Kubernetes manifests for deployment to a Minikube cluster.
The deployment process involves:
    1. Building a Docker Compose setup for development and testing.
    2. Creating Kubernetes manifests for production-like deployment (optional).
    3. Demonstrating the application functionality with appropriate documentation.
    
**3. Step-by-Step Deployment Using Docker Compose**
**Step 1: Clone the Repositories**
Download the required code:
git clone https://github.com/Anand-1432/Techdome-backend ./Techdome-backend
git clone https://github.com/Anand-1432/Techdome-frontend ./Techdome-frontend

**Step 2: Create Dockerfile for Backend**
In the Techdome-backend folder, create a Dockerfile:
**Code-Link:** https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/Techdome-backend/Dockerfile:

**Step 3: Create Dockerfile for Frontend**
In the Techdome-frontend folder, create a Dockerfile:

**Code link:** https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/Techdome-frontend/Dockerfile

**4. Build and Push Docker Images:**

**Step 1: Build Images**
**In the Techdome-backend directory, build the backend Docker image:**
docker build -t <dockerhub-username>/techdome-backend:latest .
**Switch to the Techdome-frontend directory and build the frontend Docker image:**
docker build -t <dockerhub-username>/techdome-frontend:latest .

**Step 2: Push Images to Docker Hub**
Push the backend image:
docker push <dockerhub-username>/techdome-backend:latest
Push the frontend image:
docker push <dockerhub-username>/techdome-frontend:latest

**Step 5: Create a docker-compose.yml File**
Prepare a docker-compose.yml file for defining the application architecture:
**Code Link:** https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/docker-compose.yml


6. Verify:
Backend: Accessible at http://localhost:5000.         
Frontend: Accessible at http://localhost:3000.

**Kubernetes Deployment Using Minikube:**

**Step 1: Start Minikube --drive=docker**
Initialize a local Kubernetes cluster:
minikube start --driver=docker
**Step 2: Create Kubernetes Manifests**
Prepare YAML files for each service (use the Dockerfile images built earlier):
    • Backend Deployment (backend-deployment.yaml):
    **Code Link:** https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/techdome-backend-deployment.yaml
    • Frontend Deployment (frontend-deployment.yaml):
**Code Link:**  https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/techdome-frontend-deployment.yaml
   • MongoDB Deployment (database-deployment.yaml):
**Code Link:**  https://github.com/Uday-Kumar-Neknath/techdome_assignment/blob/main/techdome-database-deployment.yaml
**Step 3: Deploy the services:**
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f database-deployment.yaml
**Step 4: Verify Deployment**
Check the status of the pods and services:
kubectl get pods -A
kubectl get services -o wide
**step 5: Verify by accessing UI:**
Access the frontend: <clusterip>:3000
Access the backend: <clusterip>:5000

**Test Communication Between Frontend and Backend and database:**

**1. Test Frontend Communication with Backend**

**backend   | listening at port 5000**
database  | {"t":{"$date":"2024-12-11T17:42:22.191+00:00"},"s":"I",  "c":"NETWORK",  "id":22943,   "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.23.0.3:35106","uuid":{"uuid":{"$uuid":"c3a528b8-2a7c-44d0-b93c-dcf80c535b1d"}},"connectionId":1,"connectionCount":1}}
database  | {"t":{"$date":"2024-12-11T17:42:22.197+00:00"},"s":"I",  "c":"NETWORK",  "id":51800,   "ctx":"conn1","msg":"client metadata","attr":{"remote":"172.23.0.3:35106","client":"conn1","negotiatedCompressors":[],"doc":{"driver":{"name":"nodejs|Mongoose","version":"5.3.0|7.1.1"},"platform":"Node.js v18.20.5, LE","os":{"name":"linux","architecture":"x64","version":"6.8.0-49-generic","type":"Linux"}}}}
**backend   | connection established...!**

**Verify the request's status (should be 200 for success) Inspect the response to ensure it matches the expected data.**

**2. Test Backend Communication with Database**
    • Use logs to verify backend interactions with the database:

**3. Look for log entries that show successful database connections and queries (e.g., "Connected to MongoDB" or "Data retrieved from database").**


**Demonstrate a rollback strategy for infrastructure changes:**

**1. Backup Before Making Changes**
kubectl get deployment <deployment-name> -o yaml > deployment-backup.yaml
kubectl get secret <secret-name> -o yaml > secret-backup.yaml
kubectl get configmap <configmap-name> -o yaml > configmap-backup.yaml

**2. Deployment with Versioning**
Use versioned deployments. Each change should be tied to a specific version, whether it's a new Docker image or a new configuration file. Kubernetes deployments help manage this with rolling updates.
Example: image: my-repository/my-app:v1.0.1 # Use versioned images

**3. Use Rolling Updates**
Kubernetes supports rolling updates, which help minimize downtime by gradually replacing old pods with new ones.
kubectl rollout undo deployment/techdome-backend

This command will undo the last deployment change and revert to the previous stable version.

**4. Monitoring and Alerting**
Implement proper monitoring and alerting for your infrastructure. If an issue is detected (e.g., service not reachable, degraded performance), trigger an alert.
You can use Prometheus, Grafana, or any other monitoring tool integrated with Kubernetes for real-time monitoring.
Deploying Multi-Container Applications with Docker Compose and Kubernetes

