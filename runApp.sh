START_DIR=$(pwd)

REACT_PORT="$((3000 + $1))"

echo "$1, $2, $3" 

cd $START_DIR/server/
npm start $1 $2 $3 &

# set trap
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

cd $START_DIR/client/
export REACT_APP_ID=$1 
export REACT_APP_NAME=$2
export REACT_APP_PEER_ID=$3
PORT=$REACT_PORT npm start

cd $START_DIR

# if npm start $1 $2; then
#     cd $START_DIR/client/
#     export REACT_APP_ID=$1
#     export REACT_APP_PEER_ID=$2
#     npm start &
#     cd $START_DIR/
# else
#     echo "usage: ./server id [peerid]"
# fi