const Web3 = require('web3')
const utils = require('./utils')
const rc_utils = require('./rc_utils')

const web3 = new Web3(new Web3.providers.HttpProvider(utils.fantom_rpc), null, utils.options)
const abi = require('./abi/abi.json')
const ra_abi = require('./abi/ra_abi.json')
const rc_abi = require('./abi/rc_abi.json')
const contract = new web3.eth.Contract(abi, utils.Rarity_contract_address)
const rarity_attribute_contract = new web3.eth.Contract(ra_abi, utils.Rarity_attribute_contract_address)
const rarity_craft_contract = new web3.eth.Contract(rc_abi, utils.Rarity_craft_contract_address)

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
    
async function main() {
  
  if (process.argv.length < 4) {
    console.log('argv: private_key method arguments')
    console.log('\t method:')
    console.log('\t\t summon class_id[1-11]')
    console.log('\t\t adventure summoner_id')

    return
  }

  let private_key = process.argv[2]
  if (private_key.startsWith('0x')) private_key = private_key.slice(2)
  
  if (process.argv[3] == 'approve') {
      
    let ids = process.argv[4].split(",")
    
    let toAddress = process.argv[5]
    if (toAddress.startsWith('0x')) toAddress = toAddress.slice(2)
    
    for (i=0;i < ids.length;i++){
        let method_sig = web3.eth.abi.encodeFunctionSignature('approve(address,uint256)')
        let data = method_sig + utils.add_pre_zero(toAddress.toString(16, 'hex')) 
                                + utils.add_pre_zero(parseInt(ids[i]).toString(16, 'hex'))
        console.log(ids[i])
        console.log(data)
        
        await utils.sign_and_send_transaction2(web3, private_key, data, utils.Rarity_contract_address)
        
//         await wait(5000)
    }
    
   

  } 

}

main()
