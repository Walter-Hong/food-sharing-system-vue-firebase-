webpackJsonp([1],{253:function(e,t,n){"use strict";function o(e){n(308)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(272),s=n(324),a=n(8),r=o,c=a(i.a,s.a,!1,r,null,null);t.default=c.exports},258:function(e,t,n){"use strict";t.a={data:function(){return{recentChats:"Recent Chats"}},created:function(){this.$store.dispatch("loadChats")},computed:{chats:function(){return this.$store.getters.chats}}}},260:function(e,t,n){"use strict";var o=n(258),i=n(261),s=n(8),a=s(o.a,i.a,!1,null,null,null);t.a=a.exports},261:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-list",{attrs:{subheader:""}},[n("v-subheader",[e._v("Recent Chats")]),e._v(" "),e._l(e.chats,function(t,o){return n("v-list-tile",{key:t.name,attrs:{avatar:"",to:/chat/+o},on:{click:function(e){}}},[n("v-list-tile-content",[n("v-list-tile-title",{domProps:{innerHTML:e._s(t.name)}})],1),e._v(" "),n("v-list-tile-action",[n("v-icon",[e._v("chat_bubble")])],1)],1)})],2)},i=[],s={render:o,staticRenderFns:i};t.a=s},272:function(e,t,n){"use strict";var o=n(310),i=n(318),s=n(260),a=n(98);n.n(a);t.a={data:function(){return{content:"",chatMessages:[],emojiPanel:!1,currentRef:{}}},props:["id"],mounted:function(){this.loadChat(),this.$store.dispatch("loadOnlineUsers")},components:{message:o.a,"emoji-picker":i.a,chats:s.a},computed:{messages:function(){return this.chatMessages},username:function(){return this.$store.getters.user.name},onChildAdded:function(){var e=this;return function(t){var n=t.val(),o=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;n.content=n.content.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),n.content=n.content.replace(o,"<a href='$1'>$1</a>"),e.chatMessages.push(e.processMessage(n))}}},watch:{chatMessages:function(e){var t=this;this.$nextTick(function(){t.scrollToEnd()})},"$route.params.id":function(e,t){this.currentRef.off("child_added",this.onChildAdded),this.loadChat()}},methods:{loadChat:function(){if(void 0!==this.id){this.chatMessages=[];var e=this.id;this.currentRef=a.database().ref("messages").child(e).child("messages").limitToLast(20),this.currentRef.on("child_added",this.onChildAdded)}},processMessage:function(e){var t=/([^\s\']+).(?:jpg|jpeg|gif|png)/i;t.test(e.content)&&(e.image=t.exec(e.content)[0]);var n=/((?:[\u2600-\u27BF\u2934-\uD7FF\uE000-\uFFFF]|[\uD800-\uD83B][\uDC00-\uDFFF]|\uD83C[\uDC00-\uDD8E\uDD91-\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;return n.test(e.content)&&(e.content=e.content.replace(n,'<span class="emoji">$1</span>')),e},sendMessage:function(){""!==this.content&&(this.$store.dispatch("sendMessage",{username:this.username,content:this.content,date:(new Date).toString(),chatID:this.id}),this.content="")},scrollToEnd:function(){var e=this.$el.querySelector(".chat-container");e.scrollTop=e.scrollHeight},addMessage:function(e){this.content+=e.value},toggleEmojiPanel:function(){this.emojiPanel=!this.emojiPanel}}}},273:function(e,t,n){"use strict";var o=n(313);t.a={data:function(){return{}},props:["messages"],components:{"chat-image":o.a},computed:{username:function(){return this.$store.getters.user.name}},methods:{imageLoad:function(){this.$emit("imageLoad")}}}},274:function(e,t,n){"use strict";t.a={props:["imgsrc"],data:function(){return{imgSrc:"https://media.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif"}},mounted:function(){var e,t;e=new Image,t=this,e.onload=function(){t.imgSrc=t.imgsrc,t.$emit("imageLoad")},e.src=this.imgsrc}}},275:function(e,t,n){"use strict";var o=n(321);t.a={data:function(){return{emojis:[]}},props:{show:!0},created:function(){var e=this;this.$http.get("https://raw.githubusercontent.com/shanraisshan/EmojiCodeSheet/master/json/string/People.json").then(function(t){e.emojis=t.body.peoples.people},function(e){})},methods:{onEmojiClick:function(e){this.$emit("click",e)},closePicker:function(){this.$emit("close")}},components:{emoji:o.a}}},276:function(e,t,n){"use strict";t.a={data:function(){return{}},props:{emoji:""},methods:{onEmojiClick:function(){this.$emit("click",this.emoji)}}}},308:function(e,t,n){var o=n(309);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(246)("083dbf41",o,!0,{})},309:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,".scrollable{overflow-y:auto;height:90vh}.typer{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;bottom:0;height:4.9rem;width:100%;background-color:#fff;-webkit-box-shadow:0 -5px 10px -5px rgba(0,0,0,.2);box-shadow:0 -5px 10px -5px rgba(0,0,0,.2)}.typer input[type=text]{position:absolute;left:2.5rem;padding:1rem;width:80%;background-color:transparent;border:none;outline:none;font-size:1.25rem}.chat-container{-webkit-box-sizing:border-box;box-sizing:border-box;height:calc(100vh - 9.5rem);overflow-y:auto;padding:10px;background-color:#f2f2f2}.message{margin-bottom:3px}.message.own{text-align:right}.message.own .content{background-color:#87cefa}.chat-container .username{font-size:18px;font-weight:700}.chat-container .content{padding:8px;background-color:#90ee90;border-radius:10px;display:inline-block;-webkit-box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-width:50%;word-wrap:break-word}@media (max-width:480px){.chat-container .content{max-width:60%}}","",{version:3,sources:["C:/Resource/Desktop/foodshare/src/components/Chat/Chat.vue"],names:[],mappings:"AACA,YACE,gBAAiB,AACjB,WAAa,CACd,AACD,OACE,8BAA+B,AACvB,sBAAuB,AAC/B,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,SAAU,AACV,cAAe,AACf,WAAY,AACZ,sBAAuB,AACvB,mDAAoD,AAC5C,0CAA4C,CACrD,AAID,wBACE,kBAAmB,AACnB,YAAa,AACb,aAAc,AACd,UAAW,AACX,6BAA8B,AAC9B,YAAa,AACb,aAAc,AACd,iBAAmB,CACpB,AACD,gBACE,8BAA+B,AACvB,sBAAuB,AAC/B,4BAA6B,AAC7B,gBAAiB,AACjB,aAAc,AACd,wBAA0B,CAC3B,AACD,SACE,iBAAmB,CACpB,AACD,aACE,gBAAkB,CACnB,AACD,sBACE,wBAA+B,CAChC,AACD,0BACE,eAAgB,AAChB,eAAkB,CACnB,AACD,yBACE,YAAa,AACb,yBAA6B,AAC7B,mBAAoB,AACpB,qBAAqB,AACrB,yGAA+G,AACvG,iGAAuG,AAC/G,cAAe,AACf,oBAAsB,CACvB,AACD,yBACA,yBACI,aAAe,CAClB,CACA",file:"Chat.vue",sourcesContent:["\n.scrollable {\n  overflow-y: auto;\n  height: 90vh;\n}\n.typer{\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  bottom: 0;\n  height: 4.9rem;\n  width: 100%;\n  background-color: #fff;\n  -webkit-box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);\n          box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);\n}\n.typer .emoji-panel{\n  /*margin-right: 15px;*/\n}\n.typer input[type=text]{\n  position: absolute;\n  left: 2.5rem;\n  padding: 1rem;\n  width: 80%;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  font-size: 1.25rem;\n}\n.chat-container{\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: calc(100vh - 9.5rem);\n  overflow-y: auto;\n  padding: 10px;\n  background-color: #f2f2f2;\n}\n.message{\n  margin-bottom: 3px;\n}\n.message.own{\n  text-align: right;\n}\n.message.own .content{\n  background-color: lightskyblue;\n}\n.chat-container .username{\n  font-size: 18px;\n  font-weight: bold;\n}\n.chat-container .content{\n  padding: 8px;\n  background-color: lightgreen;\n  border-radius: 10px;\n  display:inline-block;\n  -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n  max-width: 50%;\n  word-wrap: break-word;\n}\n@media (max-width: 480px) {\n.chat-container .content{\n    max-width: 60%;\n}\n}\n\n"],sourceRoot:""}])},310:function(e,t,n){"use strict";function o(e){n(311)}var i=n(273),s=n(317),a=n(8),r=o,c=a(i.a,s.a,!1,r,null,null);t.a=c.exports},311:function(e,t,n){var o=n(312);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(246)("03371c10",o,!0,{})},312:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,"span.emoji{font-size:20px;vertical-align:middle;line-height:2}","",{version:3,sources:["C:/Resource/Desktop/foodshare/src/components/Chat/Message.vue"],names:[],mappings:"AACA,WACE,eAAgB,AAChB,sBAAuB,AACvB,aAAe,CAChB",file:"Message.vue",sourcesContent:["\nspan.emoji {\n  font-size: 20px;\n  vertical-align: middle;\n  line-height: 2;\n}\n"],sourceRoot:""}])},313:function(e,t,n){"use strict";function o(e){n(314)}var i=n(274),s=n(316),a=n(8),r=o,c=a(i.a,s.a,!1,r,null,null);t.a=c.exports},314:function(e,t,n){var o=n(315);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(246)("d396ef9a",o,!0,{})},315:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,".image{margin:10px 10px 0;background-color:#fff;-webkit-box-shadow:0 0 34px -7px rgba(0,0,0,.75);box-shadow:0 0 34px -7px rgba(0,0,0,.75);width:200px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:auto}.message.own .image{margin-right:0;margin-left:auto}.image img{width:150px}@media (max-width:480px){.image{width:120px}.image img{width:90px}}","",{version:3,sources:["C:/Resource/Desktop/foodshare/src/components/Chat/Image.vue"],names:[],mappings:"AACA,OACE,mBAAyB,AACzB,sBAAwB,AACxB,iDAAuD,AAC/C,yCAA+C,AACvD,YAAa,AACb,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,iBAAmB,CACpB,AACD,oBACE,eAAgB,AAChB,gBAAkB,CACnB,AACD,WACE,WAAa,CACd,AACD,yBACA,OACI,WAAa,CAChB,AACD,WACI,UAAY,CACf,CACA",file:"Image.vue",sourcesContent:["\n.image{\n  margin: 10px 10px 0 10px;\n  background-color: white;\n  -webkit-box-shadow: 0px 0px 34px -7px rgba(0,0,0,0.75);\n          box-shadow: 0px 0px 34px -7px rgba(0,0,0,0.75);\n  width: 200px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-right: auto;\n}\n.message.own .image{\n  margin-right: 0;\n  margin-left: auto;\n}\n.image img{\n  width: 150px;\n}\n@media (max-width: 480px) {\n.image{\n    width: 120px;\n}\n.image img{\n    width: 90px;\n}\n}\n"],sourceRoot:""}])},316:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"image"},[n("img",{attrs:{src:e.imgSrc}})])},i=[],s={render:o,staticRenderFns:i};t.a=s},317:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.messages,function(t,o){return n("div",{staticClass:"message",class:{own:t.user==e.username}},[o>0&&e.messages[o-1].user!=t.user?n("div",{staticClass:"username"},[e._v(e._s(t.user))]):e._e(),e._v(" "),0==o?n("div",{staticClass:"username"},[e._v(e._s(t.user))]):e._e(),e._v(" "),n("div",{staticStyle:{"margin-top":"5px"}}),e._v(" "),n("div",{staticClass:"content"},[n("div",{domProps:{innerHTML:e._s(t.content)}}),e._v(" "),t.image?n("chat-image",{attrs:{imgsrc:t.image},on:{imageLoad:e.imageLoad}}):e._e()],1)])}))},i=[],s={render:o,staticRenderFns:i};t.a=s},318:function(e,t,n){"use strict";function o(e){n(319)}var i=n(275),s=n(323),a=n(8),r=o,c=a(i.a,s.a,!1,r,null,null);t.a=c.exports},319:function(e,t,n){var o=n(320);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(246)("a8af8348",o,!0,{})},320:function(e,t,n){t=e.exports=n(245)(!0),t.push([e.i,".emoji-picker{background:#fff;position:absolute;bottom:5rem;left:0;width:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.emoji-picker .emoji-header{display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px;-webkit-box-shadow:0 5px 9px 0 rgba(0,0,0,.15);box-shadow:0 5px 9px 0 rgba(0,0,0,.15)}.emoji-picker .emoji-header .emoji-close{margin-left:auto}.emoji-picker .emoji-content{margin-top:10px;overflow-y:auto;height:200px}.emoji-picker span{cursor:pointer;font-size:25px}","",{version:3,sources:["C:/Resource/Desktop/foodshare/src/components/Chat/EmojiPicker.vue"],names:[],mappings:"AACA,cACE,gBAAkB,AAClB,kBAAmB,AACnB,YAAa,AACb,OAAQ,AACR,YAAa,AACb,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,gBAAkB,CAC3B,AACD,4BACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,YAAa,AACb,+CAAqD,AAC7C,sCAA6C,CACtD,AACD,yCACE,gBAAkB,CACnB,AACD,6BACE,gBAAiB,AACjB,gBAAiB,AACjB,YAAc,CACf,AACD,mBACE,eAAgB,AAChB,cAAgB,CACjB",file:"EmojiPicker.vue",sourcesContent:["\n.emoji-picker{\n  background: white;\n  position: absolute;\n  bottom: 5rem;\n  left: 0;\n  width: 200px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.emoji-picker .emoji-header{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 5px;\n  -webkit-box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.15);\n          box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.15);\n}\n.emoji-picker .emoji-header .emoji-close{\n  margin-left: auto;\n}\n.emoji-picker .emoji-content{\n  margin-top: 10px;\n  overflow-y: auto;\n  height: 200px;\n}\n.emoji-picker span{\n  cursor: pointer;\n  font-size: 25px;\n}\n"],sourceRoot:""}])},321:function(e,t,n){"use strict";var o=n(276),i=n(322),s=n(8),a=s(o.a,i.a,!1,null,null,null);t.a=a.exports},322:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{on:{click:e.onEmojiClick}},[e._v(e._s(e.emoji.value))])},i=[],s={render:o,staticRenderFns:i};t.a=s},323:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.show?n("div",{staticClass:"emoji-picker"},[e.show?n("v-card",{attrs:{height:"300px"}},[n("v-card-title",{staticClass:"blue white--text"},[n("span",{staticClass:"headline"},[e._v("Emoji Picker")])]),e._v(" "),n("v-card-text",[n("div",{staticClass:"emoji-content"},e._l(e.emojis,function(t){return n("emoji",{attrs:{emoji:t},on:{click:e.onEmojiClick}})}))])],1):e._e()],1):e._e()},i=[],s={render:o,staticRenderFns:i};t.a=s},324:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:""}},[n("v-flex",{staticStyle:{position:"relative"},attrs:{xs12:"",sm10:"","order-xs2":""}},[n("div",{staticClass:"chat-container"},[n("message",{attrs:{messages:e.messages},on:{imageLoad:e.scrollToEnd}})],1),e._v(" "),n("emoji-picker",{attrs:{show:e.emojiPanel},on:{close:e.toggleEmojiPanel,click:e.addMessage}}),e._v(" "),n("div",{staticClass:"typer"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],attrs:{type:"text",placeholder:"Type here..."},domProps:{value:e.content},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.sendMessage(t):null},input:function(t){t.target.composing||(e.content=t.target.value)}}}),e._v(" "),n("v-btn",{staticClass:"blue--text emoji-panel",attrs:{icon:""},on:{click:e.toggleEmojiPanel}},[n("v-icon",[e._v("mood")])],1)],1)],1),e._v(" "),n("v-flex",{staticClass:"scrollable",attrs:{sm2:"","order-xs1":""}},[n("chats")],1)],1)},i=[],s={render:o,staticRenderFns:i};t.a=s}});
//# sourceMappingURL=1.fb1032991af1ba6adf75.js.map