v?=0.0.1
JSON_CHANGE="this.version=\"$(v)\""

start:
	json -I -f package.json -e "$(JSON_CHANGE)"
	composer archive create --sourceType=dir --sourceName=. 
	composer network install --archiveFile="cagri-zinciri@$(v).bna" --card=PeerAdmin@hlfv1 
	composer network start -c PeerAdmin@hlfv1 -n cagri-zinciri -V $(v) -A admin -S adminpw
	composer card import -f admin@cagri-zinciri.card  
	node ./scripts/init.js
	rm *.bna


upgrade:
	json -I -f package.json -e "$(JSON_CHANGE)"
	composer archive create --sourceType=dir --sourceName=. 
	composer network install --archiveFile="cagri-zinciri@$(v).bna" --card=PeerAdmin@hlfv1 
	composer network upgrade -c PeerAdmin@hlfv1 -n cagri-zinciri --networkVersion="$(v)"
	rm *.bna
