import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import "./homepage.css";
import homeImg from "../../assets/img/home1.png";
import donateImg from "../../assets/img/donate.png";
import collectImg from "../../assets/img/collect.png";

import logo from "../../assets/img/avatar.png";

//  chat
import { Widget, addResponseMessage } from "react-chat-widget";
import MessengerCustomerChat from "react-messenger-customer-chat";

// slide
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// img
import post1Img from "../../assets/img/homePagePost/post8.jpg";
import post2Img from "../../assets/img/homePagePost/post2.jpg";
import post3Img from "../../assets/img/homePagePost/post3.jpg";
import { ItemHomePage } from "../../components/donateItemHomePage/ItemHomePage";

// json
import { featuredPost } from "../../assets/JsonData/featuredPost";
import { MonthRegisterFullWidth1 } from "../../components/monthRegister/monthRegisterFullWidth1";
import { Footer } from "../../components/footer/Footer";
import Topnav from "../../components/topnav/TopNav";
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../action/post';
import axios from "axios";
/**
 * @author
 * @function HomePage
 **/

export const HomePage = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.data);
  const [data, setData] = useState({
    posts: 0,
    supporters: 0,
    amount: 0
  });
  const newest = posts[posts.length-1];
  useEffect(() => {
    dispatch(getAll());
    axios.get("http://localhost:8080/statistic/home/data").then(res => setData(res.data));
  }, [dispatch]);

  const ref = useRef();

  const handleDonateBtn = () => {
    window.scrollTo(0, 0);
  };

  // resposive
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // chat

  useEffect(() => {
    addResponseMessage("Welcome to this **awesome** chat!");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div>
      <Header link="home" />

      {/* Start : HomePage Top */}
      <div className="home__top">
        <div className="row">
          <div className="col-6">
            <div className="home__top-leftpannel">
              <div className="left-panel__above">
                <h1 className="home__top-maintitle">Cho ??i l?? c??n m??i</h1>
                <p className="desc">
                  Ch??ng t??i s??? "trao t???n tay" t???m l??ng nh??n ??i c???a b???n
                </p>
                <Link to="/list" className="btn-donate zoom-anim">
                  ???ng h??? ngay
                  <i class="fas fa-caret-right"></i>
                </Link>
              </div> 
              <Link to="dashboard">
                <div className="left-pannel__bottom">
                  <div className="each-item">
                    <div className="image-icon">
                      <img src={donateImg} alt="" />
                    </div>
                    <div className="info">
                      <div className="quantity">{data.posts}</div>
                      <div className="desc">Ch????ng tr??nh</div>
                    </div>
                  </div>

                  <div className="each-item">
                    <div className="image-icon">
                      <img src={collectImg} alt="" />
                    </div>
                    <div className="info">
                      <div className="quantity">{data.amount?.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VN??</div>
                      <div className="desc">T???ng s??? ti???n</div>
                    </div>
                  </div>

                  <div className="separate-item"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 ">
            <div className="home__top-rightpannel">
              <div className="image">
                <img src={homeImg} alt="" />
              </div>
              <Link to="/dashboard">
                <div className="card">
                  <div className="card-content">
                    <div className="card__title">S??? ng?????i ???ng h???</div>
                    <div className="card__quantity">{data.supporters}</div>
                    <div className="card__user">
                      <div className="user-item quantity">
                        <div className="quantity">4.5k</div>
                      </div>
                      <div className="user-item">
                        <img src={homeImg} alt="" />
                      </div>
                      <div className="user-item">
                        <img src={homeImg} alt="" />
                      </div>
                      <div className="user-item">
                        <img src={homeImg} alt="" />
                      </div>
                      <div className="user-item">
                        <img src={homeImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End : HomePage Top */}
      {/* Page 1 - new important feed */}
      <div className="homepage session1">
        <div className="new-update">
          <h2>C???p nh???t m???i nh???t</h2>
          <div className="desc">
            ????y l?? b??i vi???t m???i nh???t ???????c c???p nh???t t??? t??? ch???c qu???n l?? c???a ch??ng
            t??i
          </div>

          <div className="post">
            <div className="post-left">
              <div className="image">
                <img src={'data:image/jpeg;base64,' + newest?.image} alt="" />
              </div>
            </div>
            <div className="post-right">
              <h3>
                {newest?.title}
              </h3>
{/*               <p className="desc">
                Tr?????c t??nh h??nh d???ch b???nh v???n di???n bi???n ph???c t???p, ?????i s???ng b??
                con s??? c??n kh?? kh??n trong th???i gian d??i. Ch??ng t??i ti???p t???c m???
                th??nh Ch????ng tr??nh 20,000 ph???n qu?? ????? h??? tr??? cho c??? H??? Ch?? Minh
                v?? c??c t???nh ??ang ch???u ???nh h?????ng b???i Covid-19 m?? ch??ng t??i c?? th???
                ti???p c???n ???????c.
                <br />
                Hi v???ng s??? nh???n ???????c t??nh y??u th????ng t??? qu?? v???
              </p> */}
              <Link
                to={"/donate?id=" + newest?.id}
                onClick={handleDonateBtn}
                className="btn btn-donate zoom-anim"
              >
                ???ng h???
              </Link>
              <Link
                to={"/post?id=" + newest?.id} 
                className="btn btn-detail zoom-anim"
                onClick={() => window.scrollTo(0, 0)}
              >
                Chi ti???t
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End: Homepage page 1 */}
      {/* page2 */}
      <div className="homepage session2">
        <div className="session2-header">
          <div className="title">
            <span>C??c d??? ??n </span>
            <span>N???i b???t</span>
          </div>
          <div className="nav-item" style={{ display: "none" }}>
            <div className="nav-btn prev">
              <i class="fas fa-chevron-left"></i>
            </div>
            <div className="nav-btn next">
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>

        <div className="list-donate-itemss">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {posts.map(post =>(<ItemHomePage post={post} />))}
            {/*             {featuredPost.map((item, ind) => (
              <ItemHomePage {...item} />
            ))}
            {featuredPost.map((item, ind) => (
              <ItemHomePage {...item} />
            ))} */}
          </Carousel>
        </div>
      </div>
      {/* end : page 2 */}
      {/* page 3 */}
      <div className="homepage session2">
        <div className="session2-header">
          <div className="title">
            <span>C??c d??? ??n </span>
            <span> ???ng h??? ch???ng d???ch Covid-19</span>
          </div>
          <div className="nav-item" style={{ display: "none" }}>
            <div className="nav-btn prev">
              <i class="fas fa-chevron-left"></i>
            </div>
            <div className="nav-btn next">
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
        </div>

        <div className="list-donate-itemss">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {posts.map(post =>(<ItemHomePage post={post} />))}
            {/*             {featuredPost.map((item, ind) => (
              <ItemHomePage {...item} />
            ))}
            {featuredPost.map((item, ind) => (
              <ItemHomePage {...item} />
            ))} */}
          </Carousel>
        </div>
      </div>
      {/* end : page 3 */}
      {/* <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      /> */}
      <MessengerCustomerChat
        pageId="100076172293257"
        appId="2805262446244406"
      />

      <MonthRegisterFullWidth1 />
      <Footer />
    </div>
  );
};
