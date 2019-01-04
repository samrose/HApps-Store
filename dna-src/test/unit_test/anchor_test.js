const test = require('tape');

module.exports = (app) => {
  test('create Anchor ', (t) => {
    t.plan(1)
    const result1 = app.call("anchors", "main", "anchor", {anchor_type:"Zo",anchor_text:"El"})
    t.equal(result1, "QmTxzzUST47GVCrba6RLMeCf8wxDgTEm9Ku5khatFoCJCs")


    t.plan(2)
    const result2 = app.call("anchors", "main", "exists", {anchor_type:"Zo",anchor_text:"El"})
    t.equal(result2, true)

    t.plan(3)
    const result3 = app.call("anchors", "main", "exists", {anchor_type:"anchor_type",anchor_text:""})
    t.equal(result3, true)

    t.plan(4)
    const result4 = app.call("anchors", "main", "exists", {anchor_type:"Zo",anchor_text:""})
    t.equal(result4, true)

    t.plan(5)
    const result5 = app.call("anchors", "main", "exists", {anchor_type:"Z",anchor_text:"o"})
    t.equal(result5, false)

    // t.plan(6)
    // const result6 = app.call("anchors", "main", "get_anchor", {anchor_type:"Z"})
    // t.equal(result6, null)

    t.plan(6)
    const result7 = app.call("anchors", "main", "get_anchor", {anchor_type:"Zo"})
    t.equal(result7, null)

  })
}
