import React from 'react'
import './Apartment.css'
import TabsNabvar from './TabsNabvar'
import XmtpChat from '../xmtp-chat/XmtpChat'
import CovalentGetNfts from '../covalent-get-nfts/CovalentGetNfts'
import apt from './apt.png'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  ImageListItem,
  Grid,
  Box,
} from '@material-ui/core'

function Apartment({ currentApt, signer, currentAccount }) {
  console.log('in Apartment Cmp', currentApt)
  const navigate = useNavigate()
  const redirectToChat = () => {
    navigate('/chat')
  }
  const donateNFT = () => {
    navigate('/award')
  }
  const chatWithOwner = () => {
    navigate('/chat')
  }

  const review = () => {
    navigate('/review')
  }

  return (
    <div className="m-4">
      <p>Book / Details</p>

      <div className="card p-2">
        <div className="row">
          <div className="col-md-3">
            <img src={currentApt.image} alt="" className="current-apt-img" />
          </div>
          <div className="col-md-9">
            <br />
            <p className="title">{currentApt.name}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
              <p className="">12 Reviews</p>
            </div>
            <p>
              <i class="fa fa-check-square"></i> {currentApt.status} is the
              author of this book.
            </p>
            <p>
              <i class="fa fa-check-square"></i> {currentApt.name} is the
              official name.
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Creator
              wallet:
              {currentApt.company}
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Created{' '}
              {currentApt.created}
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Author{' '}
              <a
                href={`http://${currentApt.status}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentApt.status}
              </a>
            </p>
            <p> Description: {currentApt.info}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={chatWithOwner}
            >
              Chat with owner
            </Button>
            {'        '}
            {'        '}
            <Button variant="contained" color="primary" onClick={donateNFT}>
              Donate NFT
            </Button>
            {'        '}
            {'        '}
            <Button variant="contained" color="secondary" onClick={review}>
              Leave a review
            </Button>
          </div>
        </div>
      </div>

      <CovalentGetNfts />

      {/*TABS  */}
      <TabsNabvar />
    </div>
  )
}

export default Apartment
