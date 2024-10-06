import placeholderImage from "@/assets/img/placeholder.jpg"
import {
  AutoplayCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { GrandmasterCard } from "@/components/page/grandmaster-card"

export default function Home() {
  return (
    <div className="px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw]">
      <h1 className="pb-4 text-center font-bold text-4xl">
        2025 Ontario Open Chess Championship
      </h1>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-bold text-xl">Date and Location:</h2>
            <p>Saturday May 17 – Monday May 19, 2025</p>
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              href="https://www.google.ca/maps/place/Best+Western+Brantford+Hotel+and+Conference+Centre/@43.1640289,-80.2438909,17z/data=!4m9!3m8!1s0x882c65b7d0ed6319:0x6a46105bfa725c86!5m2!4m1!1i2!8m2!3d43.164025!4d-80.241316!16s%2Fg%2F1tmxg5r7?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D"
            >
              Best Western 19 Holiday Dr., Brantford, ON
            </a>
          </div>
          <div>
            <h2 className="font-bold text-xl">Format and Time Controls:</h2>
            <p>6 Round Swiss</p>
            <p>90 minutes + 30 second bonus</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Byes:</h2>
            <p>
              Half point byes must be requested before the previous round has
              started.
            </p>
            <p>Maximum two half point byes in rounds 1 – 4 only.</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Sections:</h2>
            <ul className="list-disc pl-4">
              <li>2000 and Above (FIDE and CFC rated)</li>
              <li>1600 – 1999 (FIDE and CFC rated)</li>
              <li>1200 – 1599 (CFC rated only)</li>
              <li>U1200 and Unrated (CFC rated only)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Tournament Directors:</h2>
            <p>Anabelle Kovatcheva and Lee Hendon</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Projected Prize Fund:</h2>
            <p>$15,000 based on 250 paid entries</p>
            <p>$10,000 based on 200 paid entries</p>
            <p>$7,000 based on 150 paid entries</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Percentage / Section:</h2>
            <p>2000 and Above: 40%</p>
            <p>1600 – 1999: 30%</p>
            <p>1200 – 1599: 20%</p>
            <p>U1200 and Unrated: 10%</p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-bold text-xl">Fees:</h2>
            <p>GM / WGM: Free Entry</p>
            <p>IM / WIM: 50% discount of relevant fee at time of entry</p>
            <p>Early: $100 before January 1, 2025</p>
            <p>Regular: $110 January 1 – April 20, 2025</p>
            <p>Late: $120 April 21 – May 15, 2025</p>
            <p>
              Onsite: $130 After May 15, 2025; Cash Only (may receive a round
              one bye)
            </p>
            <h3 className="font-bold text-lg">Play Up Fee:</h3>
            <p>$20 (must be within 100 points of next section up)</p>
            <h3 className="font-bold text-lg">$10 Discount For:</h3>
            <ul className="list-disc pl-4">
              <li>Under 18 years of age</li>
              <li>65 years and up</li>
              <li>Female</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Hotel Room Rates:</h2>
            <p>Tentatively $139 / double room</p>
          </div>
          <h2 className="text-center font-bold text-xl">Grandmasters</h2>
          <AutoplayCarousel
            className="w-full"
            opts={{ loop: true }}
            autoplaySpeed={6000}
          >
            <CarouselContent>
              <CarouselItem>
                <GrandmasterCard
                  image={placeholderImage}
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
                  temporibus qui fuga voluptates ducimus obcaecati voluptatibus nemo
                  inventore perferendis veritatis corporis, consequuntur odio earum
                  debitis numquam officia similique sequi quod est sit voluptatem."
                />
              </CarouselItem>
              <CarouselItem>
                <GrandmasterCard
                  image={placeholderImage}
                  description="Est dolorum suscipit tempora? Quis vel eaque doloremque labore
                  itaque minima laudantium, maiores veniam animi? Deleniti, molestiae assumenda. 
                  Ipsa velit quasi reiciendis exercitationem eaque, dolore perferendis dicta 
                  eligendi quidem necessitatibus error consectetur quaerat ea totam a!"
                />
              </CarouselItem>
              <CarouselItem>
                <GrandmasterCard
                  image={placeholderImage}
                  description="Voluptate, ab quam nostrum corrupti vel perspiciatis placeat
                  architecto asperiores quibusdam obcaecati nobis, magnam autem porro
                  ipsam ea nisi, deleniti labore voluptates sint impedit ullam!"
                />
              </CarouselItem>
            </CarouselContent>
          </AutoplayCarousel>
        </div>
      </div>
    </div>
  )
}
