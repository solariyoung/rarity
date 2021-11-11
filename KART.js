const Web3 = require('web3')
const utils = require('./utils_bsc')
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


  let private_key = process.argv[2]
  //if (private_key.startsWith('0x')) private_key = private_key.slice(2)

    
    //let toAddress = process.argv[5]


        //let method_sig = web3.eth.abi.encodeFunctionSignature('approve(address,uint256)')
		
        let data = '0x4618286c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000e74be5079082afe0000000000000000000000000000000000000000000000000e74be5079082afe00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000ea4fa4ad5b22be9563c0ceab5fe18a09a5c062cfcedebc1a641b8db4fabf4d28722a3f2816c36d792085bd35ac2006a019176ede6b87b4f159ccc4c9bacdfee6c1b595664884d20a9fe83d05a2c81459a16cc2eb33cb51fc71162b8b5e7eafd15fbf87dcdc1f495c2ca1d535a7195b7f2525678d93236d31a060f22d95a423ddcd5ae497e58507854c1822c2e601722cdd252c138b71b012fb22bd3b066f43a12f722438924f769fe36315eb726fc1788f9dcff5febe621c1d529735c9440160f5c2e6793565888090862223c64120ca1445ce2344cb294ed1ae95b3964212eee66bc91ad4d9b19028a4b7683e842e9dc913e95d89af993da6996f60aa83f798236984ea1efed4ebcc23bf548878224682752f755373c51cd757630e7305ce5e6685b9be523eaebcd65be8818ee994cc7e41badf283630c15975f081373cd6772007a312c144630d72a742b1bc53b4c668df993de1052d70a8fa140867cf59af091a2a00bdac8779dac4c6a9b1d4edd1a4187f3b4941d96801e4d024eb3da99c442f124315233916879fa1ed54017bf111a2695b5b4869f7bdf6ff85138e6fc5eec140e70eef981bc778beb63d45717a5e0a0c2981f602343c9a411047dd212b1'
        
        await utils.sign_and_send_transaction2(web3, private_key, data, '0xa387f47b87eb8e7f93464bd2327a36113703fb50')
        
      await wait(10000)
    


}

main()
