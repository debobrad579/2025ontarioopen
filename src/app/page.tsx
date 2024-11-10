import {
  AutoplayCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { HonoredPlayerCard } from "@/components/page/honored-player-card"
import ivanov from "@/assets/img/ivanov.jpg"

export default function Home() {
  return (
    <div className="px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw] flex gap-4 flex-col lg:flex-row">
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
            started
          </p>
          <p>Maximum two half point byes in rounds 1 – 4 only</p>
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
          <h3 className="font-bold text-lg">Percentage / Section:</h3>
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
            Onsite: $130 After May 15, 2025; Cash Only (may receive a round one
            bye)
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
        <h2 className="text-center font-bold text-xl">Honored Players</h2>
        <AutoplayCarousel
          className="w-full"
          opts={{ loop: true }}
          autoplaySpeed={6000}
        >
          <CarouselContent>
            <CarouselItem>
              <HonoredPlayerCard
                name="Mike Ivanov"
                title="International Master (Elect)"
                image={ivanov}
                description="
                  Born in 1995 in Yekaterinburg, Russia, Ivanov began playing chess at the age of four, taught by his grandfather. 
                  After moving to Toronto at eight, he started formal lessons and began competing in tournaments.
                  He earned the National Master title in 2013, the FIDE Master title in 2016, and his final International Master norm in 2024.
                  Some of his top achievements include getting first at the 2013 Ontario Chess Challenge, first U2200 at the 2015 Biel International,
                  third at the 2021 Innsbruck International, second at the 2021 Bruges Open, first U2400 at the 2022 Foxwoods Open,
                  second at the 2023 Ostravskiy Konik International, first at the 2024 Olomouc International, and second at the 2024 San Christobal De La Laguna Open."
              />
              <p></p>
            </CarouselItem>
          </CarouselContent>
        </AutoplayCarousel>
      </div>
    </div>
  )
}
