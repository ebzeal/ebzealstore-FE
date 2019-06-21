import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import Router from 'next/router';
import {CREATE_ITEM_MUTATION} from '../../queries/itemsQueries';
import Form from '../styles/Form';
// import formatMoney from '../../lib/formatMoney';
import Error from '../ErrorMessage'

class CreateItem extends Component {
  state = {
    title: 'Cool Shoes',
    description: 'I love those shoes',
    image: '',
    largeImage: '',
    price: 1000,
  };

  handleChange = e => {
    e.preventDefault();
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name] : val
    })
  }

 uploadFile = async e =>{
    console.log('Uploading file');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gqlstore');
    
    const res = await fetch('https://api.cloudinary.com/v1_1/ebzeal/image/upload', {
      method: 'POST',
      body: data
    })

    const file = await res.json();
    console.log("TCL: CreateItem -> file", file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
    
  }

  
  render() {
    const {title, price, description, image} = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {/* {(mutationfunction, payload)} mutationfunction can be changed to the name of the mutation, while payload can be destructured  */}
        {(createItem, { loading, error }) => (
        <Form onSubmit={async e=>{
          // Stop the form from submitting
            e.preventDefault();
            // call the mutation
            const res = await createItem();
            // change them to the single item page
            console.log("TCL: CreateItem -> render -> res", res)
            Router.push({
              pathname: '/item',
              query: {id: res.data.createItem.id},
            });
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                File
                <input type="file" id="file" name="file" placeholder="Upload image file" required onChange={this.uploadFile}/>
                {image && <img src={image} width="200px" alt="Upload Preview"></img>}
              </label>
              <label htmlFor="title">
                Title
                <input type="text" id="title" name="title" placeholder="Title" required value={title} onChange={this.handleChange}/>
              </label>
              <label htmlFor="price">
                Price
                <input type="number" id="price" name="price" placeholder="Price" required value={price} onChange={this.handleChange}/>
              </label>
              <label htmlFor="description">
                Description
                <textarea id="description" name="description" placeholder="Enter a description" required value={description} onChange={this.handleChange}/>
              </label>
              <button disabled={!image}>Submit</button>
            </fieldset>
      </Form>
        )}
      </Mutation>

    );
  }
}

export default CreateItem;
