import styles from '../../../styles/2245.module.css';
import Image from 'next/image';
import Navbar, { MBFooter, Footer } from '../navbar';
import { useRouter } from 'next/router';

const username = 'Jane Doe';
const data = [
  {
    tag: 'Mindifulness',
    title: 'Morning Affirmation Meditation',
    // img: "/images/25/Rectangle 19.png",
    img: '/images/25/img1.png',
  },
  {
    tag: 'Acupressure',
    title: 'Evening Tension Relief Ritual',
    // img: "/images/25/Rectangle 20.png",
    img: '/images/25/img2.png',
  },
];

export default function Content24() {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className={styles.coverimg}>
          <div className={styles.contentcover}>
            <Navbar />
          </div>
          <Image
            src="/images/25/img1.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.buttonView}>
            <button
              className={styles.buttonPlay}
              onClick={() =>
                router.push(
                  '/' +
                    router.query.hotel +
                    `/guide-practice/details/${router.query.details}/play`
                )
              }
            >
              <i className="bi bi-play-fill"></i>
            </button>
            <button
              className={styles.buttonBack}
              onClick={() =>
                router.push('/' + router.query.hotel + `/guide-practice`)
              }
            >
              <i className="bi bi-arrow-left-short"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className="container mx-auto pt-12 p-4 nearwhite">
          <h1 className="text-4xl">Six Healing Sound Guided Meditation</h1>
          <div className="flex flex-row" style={{ marginTop: '30px' }}>
            <div className="w-28 h-28 relative">
              <Image
                src="/images/25/ava.png"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="grid grid-rows-2 gap-2 pl-6 pt-3">
              <div>
                <h1
                  className="text-4xl nearwhite"
                  style={{ paddingTop: '25px', fontSize: '30px' }}
                >
                  {username}
                </h1>
              </div>
            </div>
          </div>
          <p className="nearwhite pt-6 pb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu.
          </p>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-6 pt-4 pb-2">
            {data.map((content, index) => (
              <div className="relative flow-root h-72 p-4 md:p-8" key={index}>
                <div className={styles.cardtitle}>
                  <div className="float-left w-full">
                    <div className="text-sm md:text-base">{content.tag}</div>
                    <div className="w-3/4">
                      <div className="divider"></div>
                    </div>

                    <div className="text-xl md:text-2xl pt-6">
                      {content.title}
                    </div>
                  </div>
                  <div className="float-right w-full md:pr-2 pr-2 mt-56 md:mt-52 absolute">
                    <div className="text-right text-base">{username}</div>
                  </div>
                </div>
                <Image
                  src={content.img}
                  layout="fill"
                  objectFit="cover"
                  className={styles.imgcover}
                />
              </div>
            ))}
          </div>
        </div>

        <MBFooter />
        <Footer />
      </div>
    </div>
  );
}
