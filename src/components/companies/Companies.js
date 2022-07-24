import { useEffect, useState } from 'react'
import './Companies.css'
import { apiKey } from '../APIKEYS'
import { useNavigate } from 'react-router-dom'
import MyCard from '../card/Card'
import {
  Grid,
  Typography,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  Chip,
  Container,
} from '@material-ui/core'

function Companies({ setCurrentApt, currentAccount }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadsData = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let descriptionArr = data.description.split(',$,')

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.image = await getImage(data.image)
            data.info = descriptionArr[0]
            data.company = descriptionArr[1]
            data.status = descriptionArr[2]
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadsData()
  }, [])

  const details = (curApt) => {
    setCurrentApt(curApt)
    navigate('/book/details')
  }
  return (
    <div className="cointainer-companies">
      <div className="label-btns">
        <br />
        <Chip size="medium" label="All books" color="primary" clickable />

        <Chip size="medium" label="Newest books" clickable />

        <Chip size="medium" label="Oldest books" clickable />

        <Chip size="medium" label="Ebooks" clickable />
        <Chip size="medium" label="Fun books" clickable />
      </div>

      <div className="display-flex">
        <Typography variant="h6" gutterBottom component="div">
          Trade in your books, notes, labs and more via the largest online
          decentralized book swapping community in the world.
        </Typography>
        <p className="small">Sort:Recommended ⌄</p>
      </div>

      <div className="m-3">
        <Grid container spacing={2}>
          {data.length ? (
            data.map((book, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <ImageListItem style={{ height: '450px', listStyle: 'none' }}>
                  <img src={book.image} alt="preview" />
                  <ImageListItemBar
                    title={book.name}
                    subtitle={<span>by: {book.status}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${'pet.name'}`}
                        className="icon"
                        onClick={() => details(book)}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          className="view-btn"
                        >
                          View
                        </Button>
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Grid>
            ))
          ) : (
            <h2>No Data Yet...</h2>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Companies
