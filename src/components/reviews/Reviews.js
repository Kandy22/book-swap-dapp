import React from 'react'
import './Reviews.css'
import { Avatar } from '@material-ui/core'

function Reviews() {
  return (
    <div>
      <h4>Book's Reviews </h4>
      <p>
        Make sure to leave or like a review. We are a prlatform that provides
        valuable guidance from people who’ve read the books or taking that class
      </p>

      <div className="card p-2 text-start">
        <div className="row">
          <div className="col-md-1">
            <Avatar
              alt="nft logo"
              src={''}
              style={{ width: '60px', height: '60px' }}
            />
          </div>
          <div className="col">
            <p className="title">0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
            <p>
              <i class="fa fa-check-square"></i> Verified
            </p>
            <p>
              <i class="fa fa-check-square"></i> Great Read
            </p>
            <p>
              <i class="fa fa-check-square"></i>100% recommend
            </p>
            <p>
              {' '}
              It was supposed to be a quick visit to Boston for the Buchanan
              anniversary party, then on to Scotland to collect an inheritance.
              Isabel Grace McKenna checks into the hotel and then decides to go
              for a brisk walk. But after getting lost she ends up with a
              wounded man stumbling into her arms, and then his shooter coming
              after them both. When she fires back in self-defense, she doesn’t
              expect him to drop dead.
            </p>
          </div>
        </div>
      </div>

      <div className="card p-2 text-start">
        <div className="row">
          <div className="col-md-1">
            <Avatar
              alt="nft logo"
              src={''}
              style={{ width: '60px', height: '60px' }}
            />
          </div>
          <div className="col">
            <p className="title">0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc567</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
            <p>
              <i class="fa fa-check-square"></i> Verified
            </p>
            <p>
              <i class="fa fa-check-square"></i> Great Read
            </p>
            <p>
              <i class="fa fa-check-square"></i>100% recommend
            </p>
            <p>
              {' '}
              It was supposed to be a quick visit to Boston for the Buchanan
              anniversary party, then on to Scotland to collect an inheritance.
              Isabel Grace McKenna checks into the hotel and then decides to go
              for a brisk walk. But after getting lost she ends up with a
              wounded man stumbling into her arms, and then his shooter coming
              after them both. When she fires back in self-defense, she doesn’t
              expect him to drop dead.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
