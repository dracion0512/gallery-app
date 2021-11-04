<<<<<<< HEAD
# MEVN-Gallery
## Description: App have registration to create own favorite list. (features are possible)
#### Usage needs to have installed [Node] And [MongoDB]
-----
### To use prod version
- disable web-security in browser and [generate new __SSL cert__] in __./server/cert__ folder (prevent cross-origin errors)
- if you had changed __./client__ folder [build prod version](#to-create-prod-version) at first
- [Host local MongoDB server] on default port (27017)
- open console in __./server__ folder and run command ```node server```
- open _https://localhost:9000_ 
###### All server request using _/api/_ path, other reserved for client needs
-----
### To use Vue dev client
###### Optional steps:
- disable web-security in browser and [generate new __SSL cert__] in __./server/cert__ folder (prevent cross-origin errors)
- [Host local MongoDB server] on default port (27017)
- open console in __./server__ folder and run command ```node 
server```

###### to host vue dev server: 
- open console in __./client__ folder and run command ```npm run serve```
- open _https://localhost:8080_ (as default)

###### to create prod version: 
- open console in __./client__ folder and run command ```npm run build```

[Node]: https://nodejs.org/uk/download/
[MongoDB]: https://docs.mongodb.com/manual/installation/
[Host local MongoDB server]: https://docs.mongodb.com/manual/reference/program/mongod/
[generate new __SSL cert__]: https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl