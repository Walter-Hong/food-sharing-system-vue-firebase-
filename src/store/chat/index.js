import {db} from '../../firebase/index'

const Index = {
  state: {
    chats: []
  },
  mutations: {
    setMessagesEmpty(state) {
      state.messages = []
    },
    setChats(state, payload) {
      state.chats = payload
    }
  },
  actions: {
    sendMessage({commit}, payload) {
      let chatID = payload.chatID
      const message = {
        user: payload.username,
        content: payload.content,
        date: payload.date
      }
      db.child('messages').child(chatID).child('messages').push(message)
        .then(
          (data) => {
          }
        )
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    loadChats({commit}) {
      db.child('chats').on('value', function (snapshot) {
        commit('setChats', snapshot.val())
      })
    },
    createChat({commit}, payload) {
      var newPostKey = db.child().child('chats').push().key
      var updates = {}
      updates['/chats/' + newPostKey] = {name: payload.chatName}
      db.child().update(updates)
      return new Promise((resolve, reject) => {
        resolve(newPostKey)
      })
    }
  },
  getters: {
    messages(state) {
      return state.messages
    },
    chats(state) {
      return state.chats
    }
  }
}

export default Index
