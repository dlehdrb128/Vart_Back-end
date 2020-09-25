#!/bin/bash

Instruction=$1
Chaincode_name=$2
Chaincode_version=$3

echo
echo "#Chain Code Install"
docker exec cli peer chaincode install -n $Chaincode_name -v $Chaincode_version -p github.com/$Chaincode_name
sleep 3
docker exec cli peer chaincode list --installed

echo
echo "#Chain Code $Instruction"
docker exec cli peer chaincode $Instruction -C mychannel -n $Chaincode_name -v $Chaincode_version -c '{"Args":[]}' -P "OR ('Org1MSP.member','Org2MSP.member', 'Org3MSP.member')"
sleep 3
docker exec cli peer chaincode list --instantiated -C mychannel

echo
# chaincode invoke
docker exec cli peer chaincode invoke -n $Chaincode_name -C mychannel -c '{"Args":["initLedgerPubilcinfo"]}'
sleep 3

echo
# chaincode query
docker exec cli peer chaincode query -n $Chaincode_name -C mychannel -c '{"Args":["readPublicinfo", "Publicinfo1"]}'

echo
# chaincode invoke
docker exec cli peer chaincode invoke -n $Chaincode_name -C mychannel -c '{"Args":["addPublicinfo", "Publicinfo3", "카카오", "2020-10-2", "부산", "한국", "클레이", "메인넷", "김성주", "서울대", "삼성", "환국", "카이스트", "엘지"]}'
# sleep 3

echo
# chaincode invoke
docker exec cli peer chaincode invoke -n $Chaincode_name -C mychannel -c '{"Args":["updatePublicinfo", "Publicinfo1", "카카오", "2020-10-2","부산","한국","클레이","메인넷","김성주","서울대","삼성","환국","카이스트","엘지"]}'
sleep 2

echo
# chaincode query
docker exec cli peer chaincode query -n $Chaincode_name -C mychannel -c '{"Args":["readAllPublicinfo"]}'
