cd ./client
REACT_PORT="$((3000 + $1))"
export REACT_APP_ID=$1
export REACT_APP_NAME=$2
export REACT_APP_PEER_ID=$3

PORT=$REACT_PORT npm start