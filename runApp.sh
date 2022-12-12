START_DIR=$(pwd)

if [ "$1" != "" ] && [ "$2" != "" ]; then
    REACT_PORT="$((3000 + $1))"

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
else
    echo "usage: ./server id name [peerid]"
fi