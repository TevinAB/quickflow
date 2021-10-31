import './index.css';
import NavBar from '../../components/NavBar';
import ReviewCard from '../../components/ReviewCard';
import FeatureCard from '../../components/FeatureCard';
import { useAppDispatch } from '../../hooks/redux';
import { showForm } from '../../store/slices/formManager';
import { useRef, useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';
import clsx from 'clsx';
import crmSvg from '../../assets/business.png';
import pic1 from '../../assets/reviews/pic1.jpg';
import pic2 from '../../assets/reviews/pic2.jpg';
import pic3 from '../../assets/reviews/pic3.jpg';
import pic4 from '../../assets/reviews/pic4.jpg';
import pic5 from '../../assets/reviews/pic5.jpg';
import GitHubIcon from '@mui/icons-material/GitHub';

const reviewCardSrc = [pic1, pic2, pic3, pic4, pic5];

export default function LandingPage() {
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const height = navRef.current?.clientHeight || 100;
    setNavHeight(height);
  }, [navRef]);

  return (
    <div className="landing-page">
      <NavBar
        navRef={navRef}
        loginOnClick={() =>
          dispatch(showForm({ formMode: 'New', formType: 'Login' }))
        }
        signUpOnClick={() =>
          dispatch(showForm({ formType: 'SignUp', formMode: 'New' }))
        }
      />
      <main style={{ marginTop: navHeight }} className="landing-page__main">
        <section className="hero-section landing-section-bg">
          <div className="landing-section-w hero-section__inner">
            <div className="hero-section__left">
              <div className="hero-section__title">
                <Typography variant="h1" className="hero-title">
                  <span style={{ fontWeight: 'bold' }}>QuickFlow</span> CRM
                </Typography>
              </div>
              <Typography variant="h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a
                neque enim. Vivamus non eros magna.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc a neque enim. Vivamus non eros
                magna.
              </Typography>
            </div>
            <div className="hero-section__right">
              <img
                className="crm-img"
                data-aos="fade-in"
                data-aos-duration="1200"
                src={crmSvg}
                alt=""
              />
            </div>
          </div>
          <div className="s-wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </section>
        <section className="review-section landing-section-bg-2">
          <div className="landing-section-w">
            <Typography className="section-title" variant="body1">
              Reviews
            </Typography>
            <Typography className="section-info">
              Ullam asperiores dolores repellendus velit distinctio voluptatibus
              vero voluptas fuga necessitatibus commodi deleniti sunt harum.
              Corrupti cum quia veniam. Cumque, exercitationem assumenda. Quos
              atque incidunt eum. Ea!
            </Typography>
            <div className="review-section__review-cards">
              {reviewCardSrc.map((src, index) => (
                <div
                  className={clsx(
                    'card-wrapper',
                    index % 2 === 0 ? 'card-align-start' : 'card-align-end'
                  )}
                  style={{
                    maxWidth: '76%',
                  }}
                  data-aos="fade-in"
                  data-aos-once="true"
                >
                  <Card elevation={8} sx={{ borderRadius: '10px' }}>
                    <ReviewCard imgSrc={src} reverse={index % 2 !== 0}>
                      Sed mollis, nibh eget bibendum rhoncus, augue leo eleifend
                      nisi, nec mollis urna nibh facilisis metus. Etiam
                      convallis quam est, sed elementum nunc euismod auctor. Sed
                      eleifend elit ut neque blandit scelerisque.
                    </ReviewCard>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="feature-section landing-section-bg">
          <div className="landing-section-w feature-section__inner">
            <Typography className="section-title" variant="body1">
              Features
            </Typography>
            <Typography className="section-info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              ipsum magnam quia quibusdam placeat reprehenderit distinctio saepe
              doloribus.
            </Typography>
            <div className="feature-section__features">
              <FeatureCard type="contacts">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque, provident nisi temporibus natus recusandae ea
                repellat saepe ab et? Fuga voluptatibus officiis omnis hic quo
                nisi culpa dolor consequuntur ipsum?
              </FeatureCard>
              <FeatureCard type="calendar">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, rem
                voluptate. Incidunt illum vitae quasi porro tempore veniam nihil
                esse quia. Odit facilis sed distinctio facere dolorem a
                laboriosam at!
              </FeatureCard>
              <FeatureCard type="customize">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                minima cumque quos sequi ex? Obcaecati neque rerum error omnis
                vel beatae perspiciatis, officia, aperiam optio est rem debitis
                doloribus iure.
              </FeatureCard>
              <FeatureCard type="insights">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae aliquid dolores molestiae laborum. Eos atque fugit
                iusto non distinctio dolorum ab perspiciatis sapiente quaerat.
                Aspernatur expedita accusamus excepturi nemo quas?
              </FeatureCard>
              <FeatureCard type="pipelines">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur omnis, sit voluptas pariatur blanditiis sequi
                assumenda repellat cumque libero ipsa ea deserunt dolores maxime
                quas doloremque, possimus labore non amet.
              </FeatureCard>
              <FeatureCard type="timelines">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                accusantium ratione vel, dolorem officia cum dignissimos.
                Praesentium voluptatem voluptate veritatis debitis repellendus
                quod reprehenderit eum? Hic in aspernatur sit iusto.
              </FeatureCard>
            </div>
          </div>
        </section>
        <footer className="landing__footer landing-section-bg-dark">
          <div className="landing-section-w landing__footer--inner">
            <div className="landing-footer__links">
              <ul>
                <li>
                  <a href="# ">Sales</a>
                </li>
                <li>
                  <a href="# ">Service</a>
                </li>
                <li>
                  <a href="# ">About us</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="# ">Sitemap</a>
                </li>
                <li>
                  <a href="# ">Terms and Conditions</a>
                </li>
                <li>
                  <a href="# ">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <hr />
            <p>&copy; QuickFlow CRM 2021</p>
            <a
              target="_blank"
              rel="noreferrer"
              className="git-link"
              href="https://github.com/TevinAB/quickflow"
              aria-label="github link to project"
            >
              <GitHubIcon sx={{ color: 'white' }} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
