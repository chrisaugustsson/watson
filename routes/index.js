var express = require('express');
var router = express.Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// const watson = async () => {
//   const assistant = new AssistantV2({
//     version: '2020-12-18',
//     authenticator: new IamAuthenticator({
//       apikey: 'gVDCIAZw86546Uk7G_mnfm33MPNV44iUuTEVAR6jsWnr',
//     }),
//     serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com/instances/e9b8c16b-3b5a-42be-bce9-5047e4661c7f',
//   });
  
//   let sessionId = await assistant.createSession({assistantId: 'a9244c0b-4b99-42a5-ad22-338926eb33eb'});

//   assistant.message({
//   assistantId: 'a9244c0b-4b99-42a5-ad22-338926eb33eb',
//   sessionId: sessionId.result.session_id,
//   input: {
//     'message_type': 'text',
//     'text': 'Hello'
//     }
//   })
//   .then(res => {
//     console.log(JSON.stringify(res.result, null, 2));
//   })
//   .catch(err => {
//     console.log(err);
//   }); 
// }

// watson()

const assistant = new AssistantV2({
  version: '2020-12-18',
  authenticator: new IamAuthenticator({
    apikey: 'gVDCIAZw86546Uk7G_mnfm33MPNV44iUuTEVAR6jsWnr',
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com/instances/e9b8c16b-3b5a-42be-bce9-5047e4661c7f',
});

let sessionId = assistant.createSession({assistantId: 'a9244c0b-4b99-42a5-ad22-338926eb33eb'});

// assistant.message({
// assistantId: 'a9244c0b-4b99-42a5-ad22-338926eb33eb',
// sessionId: sessionId.result.session_id,
// input: {
//   'message_type': 'text',
//   'text': 'Hello'
//   }
// })
// .then(res => {
//   console.log(JSON.stringify(res.result, null, 2));
// })
// .catch(err => {
//   console.log(err);
// }); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/message', function(req, res, next) {
  sessionId.then(a => {

    assistant.message({
      assistantId: 'a9244c0b-4b99-42a5-ad22-338926eb33eb',
      sessionId: a.result.session_id,
      input: {
        'message_type': 'text',
        'text': req.body.message
        }
      })
      .then(resTwo => {
        // console.log(JSON.stringify(res.result, null, 2));
        // res.send(JSON.stringify(res.result, null, 2))
        res.send(JSON.stringify(resTwo.result.output.generic, null, 2));
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(501);
      }); 
  });
  // console.log("body: " + req.body.message);
  // res.sendStatus(200);
});

module.exports = router;



