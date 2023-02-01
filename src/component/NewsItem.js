import React, { Component } from "react";


export class NewsItem extends Component {
 
  render() {
   let  {title,description,imageUrl,newsUrl,author,publishedAt,source}=this.props;
    return (
      <div>
        <div className="card" >
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:'1'}}>{source}
    <span classname="visually-hidden">unread messages</span>
  </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">{author?author:"Unknown"} <br/> {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} rel ="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read more!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
