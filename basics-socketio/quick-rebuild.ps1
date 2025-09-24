docker stop socketio-container 2>$null
docker rm socketio-container 2>$null  
docker rmi socketio-seguro 2>$null
docker build -t socketio-seguro .
docker run --name socketio-container -p 3000:3000 socketio-seguro