import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
     country:'in',
     pageSize:8,
     category:'general'

  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string, 
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  articles = []
  constructor(props){
    super(props);
    // console.log('constructor always come along super class hey i am constructor from new component')
    this.state={
      articles:this.articles,
      loading:false, 
      page:1
    } 
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - News-App`

  }
  async updatenews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    &apiKey=dea5831ce57749f78aa44031d520d959&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);    
    let parsedata = await data.json();
    console.log(parsedata); 
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false})  
    
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dea5831ce57749f78aa44031d520d959&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);    
    let parsedata = await data.json();
    
    console.log(parsedata); 
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false})  

  }
  handlePrevClick=async()=>{
    console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dea5831ce57749f78aa44031d520d959&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata); 
    this.setState({
      articles:parsedata.articles,
      page:this.state.page-1,
      loading:false
    })
  }
  handleNextClick=async()=>{
    // console.log("next") 
    if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))) {
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dea5831ce57749f78aa44031d520d959&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    
    // console.log(parsedata); 
    this.setState({
      articles:parsedata.articles,
      page:this.state.page+1,
      loading:false
    })}
   
  }

  render() {

    return (
      <div className='container ' style={{marginTop:'90px'}}>
        <h2 className='text-center my-4' >NewsApp - Top <strong style={{color:"red"}}>{this.capitalizeFirstLetter(this.props.category)}</strong> Headlines</h2>
       {this.state.loading && <Spinner/>}
        <div className="row">
        { !this.state.loading &&this.state.articles.map((element)=>{
          // console.log(element)
         return  <div className="col-md-4 my-2" key={element.url}>
          <NewsItem  title = {element.title?element.title:""} description = {element.description?element.description:""} 
          imageUrl={element.urlToImage?element.urlToImage:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} 
          newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
            </div>
          })}  
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button type="button" disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize )} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
