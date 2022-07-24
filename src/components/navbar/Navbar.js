import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../images/mylogo.jpg'
import UAuth from '@uauth/js'
import Web3Modal from 'web3modal'
import Button from '@material-ui/core/Button'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'

function Navbar({
  currentAccount,
  onClickDisconnect,
  onClickConnect,
  balance,
  providerSave,
  connectSequence,
  sequenceWallet,
}) {
  // var provider = new ethers.providers.Web3Provider(ethereum)
  // ENS functionality is provided directly on the core provider object.
  const [udUser, setudUser] = useState('')

  const uauth = new UAuth({
    clientID: '69c407cc-4663-48af-af8a-4f90592ba307',
    redirectUri: 'http://localhost:3000',
  })
  const loginUD = async (e) => {
    e.preventDefault()
    try {
      const authorization = await uauth.loginWithPopup()
      const currentUser = authorization.idToken.sub
      setudUser(currentUser)
    } catch (error) {
      console.error(error)
    }
  }
  const unstoppableDomainsLogout = () => {
    console.log('logging out!')
    uauth.logout().catch((error) => {
      console.error('profile error:', error)
    })
    setudUser('')
  }

  const search = async (e) => {
    e.preventDefault()
    // takes in  ensDomain & returns the wallet address
    var result = await providerSave.resolveName('albert.eth')
  }

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark my-navbar">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse2"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse2">
            <div className="navbar-nav">
              <a href="/" className="nav-item nav-link active my-nav">
                Book-Swap
              </a>
              <a
                href="/post-apartment"
                className="nav-item nav-link active my-nav"
              >
                Register
              </a>
              <a href="/review" className="nav-item nav-link active my-nav">
                Review
              </a>
              <a href="/award" className="nav-item nav-link active my-nav">
                Donate
              </a>
            </div>

            <div className="d-flex ms-auto">
              {sequenceWallet ? (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<VerifiedUserSharpIcon />}
                >
                  {sequenceWallet.substring(0, 8)}...
                  {sequenceWallet.substring(38)}
                </Button>
              ) : (
                ''
              )}

              {currentAccount ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: '#03ad03' }}
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {currentAccount.substring(0, 8)}...
                    {currentAccount.substring(38)}
                  </Button>
                  <Button
                    style={{ color: 'white' }}
                    to="/"
                    onClick={onClickDisconnect}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#03ad03' }}
                    onClick={onClickConnect}
                  >
                    Connect Wallet
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div>
        {currentAccount ? (
          <div className="display-flex">
            <p>
              <strong>Your balance is:</strong> {balance}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Navbar
