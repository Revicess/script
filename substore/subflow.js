// 修改自：https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/sub-info/node.js
//流量信息显示

async function operator(proxies = [], targetPlatform, env) {
  const { parseFlowHeaders, getFlowHeaders, flowTransfer } = flowUtils
  const {
    expires,
    total,
    usage: { upload, download },
  } = parseFlowHeaders(await getFlowHeaders(env.source[proxies[0].subName].url))
  const date = expires ? new Date(expires * 1000).toLocaleDateString() : ''

  const current = upload + download
  const currT = flowTransfer(Math.abs(current))
  currT.value = current < 0 ? '-' + currT.value : currT.value
  const totalT = flowTransfer(total)
  const display = env.source[proxies[0].subName].displayName || env.source[proxies[0].subName].name
  proxies.unshift({
    type: 'ss',
    server: '1.0.0.1',
    port: 80,
    cipher: 'aes-128-gcm',
    password: 'password',
    name: `${display}: ${currT.value} ${currT.unit} / ${totalT.value} ${totalT.unit} ${date}`,
  })
  return proxies
}
