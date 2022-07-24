import React, { useState, useEffect } from 'react'
import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'
import { Button } from '@mui/material'
import './XmtpChat.css'
import send from '../../images/send.png'
import userChatImage from '../../images/you.png'
import companyChatImage from '../../images/logo1.png'
import { async } from '@firebase/util'

export default function XmtpChat({ signer, currentAccount, currentApt }) {
  const [message, setMessage] = useState('')
  const [xmtpconnection, setXmtpconnection] = useState('')
  const [chatMessages, setChatMessages] = useState('')
  const [buyerInput, setBuyerInput] = useState(' ')
  const sender = '0x11Afb8521CbF03C3508378E41d4C5b7e2C90b233'

  const writeToTableLand = async () => {
    //  wallet: 0001
    //  tableId: tableland+number:
    //  we save it on the contract
    //   table:
    // tableId: userWallet
  }

  const date = new Date().toJSON().slice(0, 10).split('-').reverse().join('-')
  useEffect(() => {
    // loadXmtpClient()
  }, [])

  const connectXmtpClient = async () => {
    const xmtp = await Client.create(signer)
    setXmtpconnection(xmtp)
    // Start conversation with Company
    const conversation = await xmtp.conversations.newConversation(sender)
    // Load all messages in the conversation
    const messages = await conversation.messages()
    const allConversations = await xmtp.conversations.list()

    const tempMsgs = []
    for (let msg of messages) {
      if (
        msg.recipientAddress == '0x11Afb8521CbF03C3508378E41d4C5b7e2C90b233' &&
        msg.senderAddress == '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
      ) {
        tempMsgs.push(msg)
      }
    }
    setChatMessages(tempMsgs)
    for await (const message of await conversation.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.text}`)
    }
  }

  const sendXmtpMesg = async () => {
    const xmtp = await Client.create(signer)
    // Start conversation with Company
    const conversation = await xmtp.conversations.newConversation(sender)
    // Send a message
    const send = await conversation.send(message)
    const messages = await conversation.messages()
    console.log('🚀messages', messages)
    setBuyerInput(message)
  }

  const you = (
    <div class="first">
      <div class="avt">
        <img
          src="https://i.imgur.com/7D7I6dI.png"
          alt="avatar"
          className="userChatImage"
        />
      </div>
      <div class="message">
        <p className="message">
          Hello, I would love to know the price and the physical consition of
          this book, thank you.
        </p>
      </div>
    </div>
  )

  const youSecond = (
    <div class="first">
      <div class="avt">
        <img
          src="https://i.imgur.com/7D7I6dI.png"
          alt="avatar"
          className="userChatImage"
        />
      </div>
      <div class="message">
        <p className="message">{buyerInput}</p>
      </div>
    </div>
  )

  const thirdMesg = (
    <div class="first">
      <div class="avt">
        <img src={userChatImage} alt="avatar" className="userChatImage" />
      </div>
      <div class="message">
        <p className="message third-msg">Also I would like to know</p>
      </div>
    </div>
  )

  return (
    <div className="xmtpchat-body">
      {xmtpconnection ? (
        <div class="wrapper">
          <div class="left">
            <div class="left-container">
              <div class="left-card">
                <div class="left-card-container">
                  {/* this should take 575px */}
                  <div className="item1">
                    <div class="left-header">
                      <div class="left-header-container">
                        <div>
                          <div class="arrow"></div>
                          <span class="header-bold">{currentApt.name}</span>
                        </div>
                        <div class="kebab-menu">
                          <img
                            src="https://i.postimg.cc/mk2w8wBr/Dots.png"
                            alt="kebab-menu"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="today">{date}</div>
                    <div class="left-body">
                      <div class="left-body-container">
                        {you}
                        {buyerInput ? youSecond : ''}

                        <br />
                        {currentAccount ===
                        '0x11afb8521cbf03c3508378e41d4c5b7e2c90b233'
                          ? thirdMesg
                          : ''}
                      </div>
                    </div>
                  </div>
                  <div className="item2">
                    <div class="left-footer">
                      <div class="left-footer-container">
                        <div class="input-group">
                          <div class="input-container">
                            <div>
                              <div class="share">
                                <img
                                  src="https://i.postimg.cc/5ysmGkmr/Attachment.png"
                                  alt="share"
                                />
                              </div>
                              <div class="inp">
                                <input
                                  type="text"
                                  placeholder="Your message"
                                  defaultValue={message}
                                  className="form-control"
                                  id="message"
                                  onChange={(e) => setMessage(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="btn-container">
                          <button onClick={sendXmtpMesg}>
                            <img
                              src="https://i.postimg.cc/5t4hhvd2/Union-1.png"
                              alt="send"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- left-end -->

      <!-- right-start --> */}
          <div class="right">
            <div class="right-container">
              <div class="right-card">
                <div class="right-card-container">
                  <h3 class="card__title">{currentApt.name}</h3>
                  <p class="card__description">{currentApt.description}</p>
                  <img
                    src={currentApt.image ? currentApt.image : ''}
                    class="xmtpchat-card__image"
                    alt=""
                  />
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={connectXmtpClient}>
          Connect to Xmtp Client
        </Button>
      )}
    </div>
  )
}
