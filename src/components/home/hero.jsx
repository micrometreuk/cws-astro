import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function HomeHero({ block, dataBinding }) {
  return (
    <>
      <section className="hero-two pt-15" data-cms-bind={dataBinding} >
      <div>
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/carousel/carousel.webp" className="img-fluid" alt="laptop " loading="eager"/>
            </div>
            <div className="carousel-item ">
              <img src="/images/carousel/carousel3.webp" className="img-fluid" alt="server " loading="eager" />
            </div>
          </div>
        </div>
      </div>

        <div className="hero-two-shape"></div>
        <div className="container-fluid">
              <div className="hero-two-content">
                <h1 className="mb-4">{block.title}</h1>
                <div
                  className="mb-7 w-xxl-80"
                  dangerouslySetInnerHTML={{
                    __html: md.render(block.description),
                  }}
                />
                <div className="">
                  {block.button && (
                    <a
                      href={block.button.link}
                      className="btn btn-primary btn-lg"
                    >
                      {" "}
                      {block.button.text}{" "}
                    </a>
                  )}
                </div>
              </div>
        </div>
      </section>
    </>
  );
}
