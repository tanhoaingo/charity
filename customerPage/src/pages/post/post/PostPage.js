import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-awesome-slider/dist/captioned.css";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { RecentDonates } from "../../../assets/JsonData/RecentDonates";
import { Header } from "../../../components/header/Header";
// css
import "./postpage.css";



/**
 * @author
 * @function PostPage
 **/

export const PostPage = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [post, setPost] = useState({
    id: 0,
    title: '',
    organization: '',
    type: '',
    postDate: 0,
    remainingDay: 0,
    content: [],
    contribution: 0,
    expectation: 0,
    images: [{
      id: 0,
      description: '',
      imgByte: ''
    }]
  });
  const [images, setImages] = useState([
    {
      url: "https://www.1stformationsblog.co.uk/wp-content/uploads/2020/09/Charity-Image.png"
    }
  ]);
  useEffect(() => {
    axios.get("http://localhost:8080/post/get/" + queryParams.get('id')).then(res => {
      setPost(res.data);

      let items = [];
      res.data.images.map(image => items.push({url: 'data:image/jpeg;base64,' + image.imgByte}));
      setImages(items);
    });
  }, [])

  return (
    <div>
      <Header />
      <div className="post-page">
        <div className="post-page__header">
          <div className="header__title">
            <h3>
              {post.title}
            </h3>

            <div className="header-info">
              <div className="txt txt-author">
                <i class="fas fa-check-circle"></i> {post.organization}
              </div>
              <div className="txt txt-date">{new Date(post.postDate).toLocaleDateString("vi-VN")}</div>
              <div className="txt txt-type">{post.type}</div>
            </div>
          </div>
          <div className="slider">
            <SimpleImageSlider
              width={1000}
              height={404}
              images={images}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
            />
          </div>
        </div>
        <div className="post-page__above">
          <h3>Tổng quan</h3>
          <div className="items">
            <div className="item">
              <span>35</span>
              <p>Lượt Ủng Hộ</p>
            </div>
            <div className="item">
              <span>{post.contribution.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</span>
              <p>Tổng tiền</p>
            </div>
            <div className="item">
              <span>63</span>
              <p>Tình nguyện viên</p>
            </div>
          </div>

          <div className="funtion">
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="report"
              to="/analysic"
            >
              <i class="bx bxs-report"></i> Xem báo cáo
            </Link>
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="donate"
              to="/donate"
            >
              Ủng hộ
            </Link>
          </div>
        </div>

        <div className="post-page__body">
          <div className="left">
            <h1 className="txt-title">Thông tin về chiến dịch</h1>
            {post.content.map((paragraph, index) => {
              if (index < 4) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index === 0) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
            {post.content.map((paragraph, index) => {
              if (index >= 4 && index < 10) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index === 1) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
            {post.content.map((paragraph, index) => {
              if (index >= 10) {
                return <p>{paragraph}</p>;
              }
            })}
            {post.images.map((image, index) => {
              if (index > 1) {
                return <div>
                  <div className="image">
                    <img
                      src={'data:image/jpeg;base64,' + image.imgByte}
                      alt=""
                    />
                  </div>
                  <h6>
                    {image.description}
                  </h6>
                </div>
              }
            })}
          </div>

          <div className="right">
            <div className="recent-donates">
              <div className="txt-recent-donates">
                <div className="txt">Đóng góp gần đây</div>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  to="/user"
                >
                  Xem tất cả
                </Link>
              </div>
              {RecentDonates.map((value, ind) => (
                <div className="item" key={ind}>
                  <div className="avatar">
                    <img src={value.avatar} alt="" />
                  </div>
                  <div className="info">
                    <div className="name">{value.name}</div>
                    <div className="time">{value.time}</div>
                  </div>
                  <div className="money">{value.money}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
