import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import RazorpayButton from './RazorpayButton';

const Homepage = () => {

  const navigate = useNavigate();

  const [isSubscribed, setIsSubscribed] = useState(false);

  // Simulate fetching subscription status (replace with actual API call if available)
  useEffect(() => {
    const userSubscriptionStatus = localStorage.getItem('isSubscribed'); // Fetch from storage or API
    setIsSubscribed(userSubscriptionStatus === 'true'); // Convert string to boolean
  }, []);

  const handleJoinForum = (forumId) => {
    navigate(`/chat/${forumId}`);
  };

  return (
    
    <Container fluid>
      <navbar></navbar>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <h1>Welcome to Mental Health Assistance</h1>
        <p>Your one-stop destination for mental health resources, support, and growth.</p>
      </section>

      <section className="carousel-banner">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://imgscf.slidemembers.com/docs/1/1/377/meditation_for_self-care_powerpoint_presentation_slides_376564.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>"Your Mind Matters"</h3>
              <p>Take the first step toward mental wellness.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://static.wixstatic.com/media/341119_aa39548cf5454380b28b8f6721f237e3~mv2.jpg/v1/fill/w_752,h_226,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/341119_aa39548cf5454380b28b8f6721f237e3~mv2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>"Find Peace Within"</h3>
              <p>Discover mindfulness and self-care strategies.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://jidnyasagurukulam.graphy.com/_next/image?url=https%3A%2F%2Fd502jbuhuh9wk.cloudfront.net%2Fcourses%2F66825bf7efd150059f969d77%2Fcover%2F2024-07-01T07%3A46%3A00.975Z.jpg&w=1920&q=75"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>"Stronger Every Day"</h3>
              <p>Unleash your inner strength with our resources.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* About Us Section */}
      <section className="about-us py-5 text-center">
        <Container>
          <h2>About Us</h2>
          <Row className="justify-content-center">
            {[
              { icon: '🎥', title: 'Videos', desc: 'Watch insightful videos on stress management.' },
              { icon: '🎧', title: 'Podcasts', desc: 'Listen to mental health experts.' },
              { icon: '📖', title: 'Articles', desc: 'Read articles on self-improvement.' },
              { icon: '💬', title: 'Community Forums', desc: 'Engage in discussions on mental health topics.' },
              { icon: '👩‍⚕️', title: 'Therapists', desc: 'Find certified professionals to support you.' },
            ].map((item, index) => (
              <Col md={4} key={index} className="about-item my-3">
                <div className="icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Community Forums Section */}
      <section className="community-forums py-5 bg-light mt-3">
        <Container>
          <h2 className="text-center">Community Forums</h2>
          <p className="text-center">Join discussions on mental health topics.</p>
          <Row className="justify-content-center">
            {[
              { id: 1, title: 'Mental Health Tips', desc: 'Get practical tips and strategies for maintaining mental wellness.' },
              { id: 2, title: 'Anxiety Support', desc: 'Share your experiences and find support from others dealing with anxiety.' },
              { id: 3, title: 'Motivational Stories', desc: 'Read and share inspiring stories of resilience and growth.' },
              { id: 4, title: 'Insecurities', desc: 'Discuss and overcome personal insecurities with a supportive community.' },
              { id: 5, title: 'Self-Help', desc: 'Explore self-help techniques to improve mental well-being.' },
              { id: 6, title: 'Meditation', desc: 'Learn about meditation techniques and their benefits for mental health.' },
              { id: 7, title: 'Self-Confidence', desc: 'Find ways to build self-confidence and self-esteem.' },
            ].map((forum) => (
              <Col md={3} key={forum.id} className="forum-box mx-2 my-2">
                <div className="message-box">
                  <p><strong>{forum.title}</strong></p>
                  <p className="forum-desc">{forum.desc}</p>
                  <Button variant="outline-primary" size="sm" onClick={() => handleJoinForum(forum.id)}>
                    Join
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <h4 className="text-center mt-3"><u><i>To explore more forums, visit the community forums page.</i></u></h4>
        </Container>
      </section>
      {/* Resource Section */}
      <section className="resources-section">
        {/* Videos Section */}
        <div className="resource-item video-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h2>Videos</h2>
                <p>Watch our curated video on managing stress effectively.</p>
              </Col>
              <Col md={6}>
                <iframe
                  width="100%"
                  height="280"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Sample Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="slant-divider"></div>

        {/* Podcasts Section */}
        <div className="resource-item podcast-section py-5 mt-5">
          <Container>
            <Row className="align-items-center flex-row-reverse">
              <Col md={6}>
                <h2>Podcasts</h2>
                <p>Listen to an inspiring podcast about overcoming challenges.</p>
              </Col>
              <Col md={6}>
                <audio controls style={{ width: '100%' }}>
                  <source src="sample-podcast.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="slant-divider"></div>

        {/* Articles Section */}
        <div className="resource-item article-section py-5 mt-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h2>Articles</h2>
                <p>Mental peace refers to the deliberate state of spiritual calm and the potential of stressors such as the burden arising from pretending to perform at an optional level with a positive mind (inner peace). Peace of mind is generally associated with joy, happiness, calmness, prayer, yoga, meditation etc. many spiritual practices refer to this peace as an experience of knowing oneself. </p>
                <Button variant="outline-primary">Read Article</Button>
              </Col>
              <Col md={6}>
                <img src="https://media.istockphoto.com/id/1421170573/photo/aspiration-for-change.jpg?s=612x612&w=0&k=20&c=3edLSV2-XIxGB47g4FHLljigkXjYiqwDUyuGpT4lLv0=" height={100} width={400} alt="Article" className="img-fluid rounded ml-5" />
              </Col>
            </Row>
          </Container>
          </div>
          {/* Therapist Carousel */}
      <section className="section-therapists pt-5">
        <div className="container">
          <h2>Our Therapists</h2>
          <div id="therapistCarousel" className="carousel slide mt-3 pt-3" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Jane Doe"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Jane Doe</h5>
                        <p>Specialization: CBT</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Jane Doe"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Jane Doe</h5>
                        <p>Specialization: CBT</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. John Smith"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. John Smith</h5>
                        <p>Specialization: Psychodynamic Therapy</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Emily Johnson"
                      />
                      <div className="card-body">
                        <h5 className="card-title
                        ">Dr. Emily Johnson</h5>
                        <p>Specialization: Family Therapy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Michael Brown"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Michael Brown</h5>
                        <p>Specialization: Mindfulness Therapy</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Sarah Wilson"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Sarah Wilson</h5>
                        <p>Specialization: Trauma Therapy</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Sarah Wilson"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Sarah Wilson</h5>
                        <p>Specialization: Trauma Therapy</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3063/3063015.png"
                        className="card-img-top"
                        alt="Dr. Robert Lee"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Dr. Robert Lee</h5>
                        <p>Specialization: Anxiety and Depression</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#therapistCarousel"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#therapistCarousel"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
        
      </section>
      {/* Subscribe Section */} 
      {!isSubscribed && (
        <section className="subscribe-section py-5 text-center bg-light">
          <Container fluid style={{ backgroundColor: '#ffe4e1', padding: '30px' }}>
            <h3>Unlock Your Path to Wellness! 🌟 </h3>
            <br />
            <p>Subscribe now to access exclusive resources, expert guidance, and a supportive community dedicated to your mental well-being.</p>
            <RazorpayButton />
          </Container>
        </section>
      )}
    </Container>
  );
};

export default Homepage;
