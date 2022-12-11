cd ./server

if npm start $1 $2; then
    echo "success"
else
    echo "usage: ./server id [peerid]"
fi