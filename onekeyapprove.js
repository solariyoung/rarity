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
    let ids = parseInt(process.argv[4])
    let summoners = ids.split(",")
    console.log(summoners)
    return
    
    if (isNaN(class_id) || class_id < 1 || class_id > 11) {
      console.log('bad class_id')
      return
    }

    console.log('- summon')
    let method_sig = web3.eth.abi.encodeFunctionSignature('summon(uint256)')
    let data = method_sig + utils.add_pre_zero(class_id.toString(16, 'hex'))
    await utils.sign_and_send_transaction(web3, private_key, data, utils.Rarity_contract_address)

  } 

}

main()
