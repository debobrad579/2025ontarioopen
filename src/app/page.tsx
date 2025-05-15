import {
  AutoplayCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { FeaturedPlayerCard } from "@/components/page/featured-player-card"
import { SponsorCard } from "@/components/page/sponsor-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HealthSpotLogo } from "./health-spot-logo"
import { GhentLogo } from "./ghent-logo"
import preotu from "@/assets/img/preotu.jpg"
import poltkin from "@/assets/img/plotkin.jpg"
import vettese from "@/assets/img/vettese.jpg"
import atanasov from "@/assets/img/atanasov.jpg"
import thavandiran from "@/assets/img/thavandiran.jpg"
import liang from "@/assets/img/liang.jpg"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Home() {
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row leading-[1.35]">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-1 items-end">
            <h2 className="font-bold text-xl">Contact:</h2>
            <a
              href="mailto:2025ontarioopen@gmail.com"
              className="text-blue-500 hover:underline"
            >
              2025ontarioopen@gmail.com
            </a>
          </div>
          <div>
            <h2 className="font-bold text-xl">Date and Location:</h2>
            <p>
              Saturday, May 17 &ndash; Monday, May 19, 2025, 10 am &ndash; 4 pm
            </p>
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
            <b>Active CFC membership required</b>
          </div>
          <div>
            <h2 className="font-bold text-xl">Byes:</h2>
            <p>
              Half point byes must be requested before the previous round has
              started
            </p>
            <p>Maximum two half point byes in rounds 1 &ndash; 4 only</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-1 items-center">
              <h3 className="font-bold text-lg">Tournament Director:</h3>
              <p>Lee Hendon</p>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <h3 className="font-bold text-lg">Chief Arbiter:</h3>
              <p>FA Anabelle Kovatcheva</p>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <h3 className="font-bold text-lg">Deputy Arbiter:</h3>
              <p>Lee Hendon</p>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <h3 className="font-bold text-lg">Arbiters:</h3>
              <p>Brian Clarke, Zheng Ren</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <h2 className="font-bold text-xl">Sections:</h2>
            <ul className="list-disc pl-4">
              <li>2000 and Above (FIDE and CFC rated)</li>
              <li>1600 &ndash; 1999 (FIDE and CFC rated)</li>
              <li>1200 &ndash; 1599 (CFC rated only)</li>
              <li>U1200 and Unrated (CFC rated only)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Prizes:</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[3ch]"></TableHead>
                  <TableHead className="w-[12ch]">Open</TableHead>
                  <TableHead className="w-[12ch]">U2000</TableHead>
                  <TableHead className="w-[12ch]">U1600</TableHead>
                  <TableHead className="w-[12ch]">U1200/Unr.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">1st</TableCell>
                  <TableCell>$2,500</TableCell>
                  <TableCell>$1,800</TableCell>
                  <TableCell>$900</TableCell>
                  <TableCell>$450</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">2nd</TableCell>
                  <TableCell>$1,250</TableCell>
                  <TableCell>$900</TableCell>
                  <TableCell>$450</TableCell>
                  <TableCell>$200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">3rd</TableCell>
                  <TableCell>$850</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell>$250</TableCell>
                  <TableCell>$150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">4th</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell>$300</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">5th</TableCell>
                  <TableCell>$300</TableCell>
                  <TableCell>$200</TableCell>
                  <TableCell>$80</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">1st</TableCell>
                  <TableCell>$400 (U2200)</TableCell>
                  <TableCell>$200 (U1800)</TableCell>
                  <TableCell>$120 (U1400)</TableCell>
                  <TableCell>$100 (U1000)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">2nd</TableCell>
                  <TableCell>$200 (U2200)</TableCell>
                  <TableCell>$100 (U1800)</TableCell>
                  <TableCell>$80 (U1400)</TableCell>
                  <TableCell>$100 (1st Unr.)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-bold text-2xl">Unfortunately, there are no more entries available.</h2>
            <h2 className="font-bold text-xl line-through">Fees:</h2>
            <p className="line-through">GM / WGM: Free entry</p>
            <p className="line-through">
              IM / WIM / FIDE 2400+: $60 (no additional discounts)
            </p>
            <p className="line-through">Early: $100 before January 1, 2025</p>
            <p className="line-through">Regular: $110 January 1 &ndash; April 20, 2025</p>
            <p className="line-through">Late: $120 April 21 &ndash; May 15, 2025</p>
            <h3 className="font-bold text-lg line-through">Play Up Fee:</h3>
            <p className="line-through">$20 (must be within 100 points of next section up)</p>
            <div className="flex gap-1 items-center">
              <h3 className="font-bold text-lg line-through">$10 Discounts:</h3>
              <p className="text-muted-foreground text-sm line-through">(Maximum $20)</p>
            </div>
            <ul className="list-disc pl-4">
              <li className="line-through">Junior: Born in or after 2005</li>
              <li className="line-through">Senior: Born in or before 1960</li>
              <li className="line-through">Female</li>
              <li className="line-through">FIDE Master</li>
            </ul>
            <h3 className="font-bold text-lg">Refunds:</h3>
            <ul className="list-disc pl-4">
              <li>Must be requested on or before Thursday, May 15, 2025</li>
              <li>Will include a non-refundable service charge of 3.2%</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
        <div className="space-y-4">
          <h2 className="text-center font-bold text-xl">Featured Players</h2>
          <AutoplayCarousel
            className="w-full"
            opts={{ loop: true }}
            autoplaySpeed={6000}
          >
            <CarouselContent>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Razvan Preotu"
                  title="Grandmaster"
                  image={preotu}
                  description="
                Born in 1999 in Toronto, Canada, Razvan Preotu started playing chess young; his first organized tournament was at age seven
                —the Grade 2 Chess'n Math Association event in Toronto. At ten, he started formal lessons and quickly progressed.
                He earned the National Master title in 2013, became a FIDE Master later that year, and achieved the International Master title in 2014.
                Preotu earned his Grandmaster title in 2016, becoming the second youngest Canadian-born GM. Some of his top achievements include
                getting first at the 2016 Calgary International, tying for first at the 2017 Canadian Open Master, getting first at the 2018 Quebec Open,
                and being the top Canadian scorer at the 2022 and 2024 Chess Olympiad."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Mark Plotkin"
                  title="International Master"
                  image={poltkin}
                  description="
                Mark Plotkin is a distinguished Canadian chess player and coach, holding the FIDE title of International Master and ranking 27th among active
                players in the country. His chess journey began with his father, Victor Plotkin, a strong FIDE Master and captain of several Canadian Olympiad teams.
                Mark studied Political Science and Journalism at the University of Toronto, where he joined the Hart House Chess Club and helped the team
                win the Canadian University Chess Championship. He won the Canadian Banff Chess Tournament during the pandemic and finished fifth in the
                Titled Tuesday Tournament against 340 titled players, beating several top grandmasters. Embracing a full-time role as a chess teacher,
                Mark has produced several Canadian Champions and FIDE titleholders."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Nicholas Vettese"
                  title="International Master"
                  image={vettese}
                  description="
                Nicholas Vettese is a current student at the University of Toronto who began playing chess in Grade 1 at an elementary school lunchtime program 
                offered by the Chess and Math Association.  At the age of 10, he became the youngest-ever Canadian National Master. In 2016 he won the 
                North American Youth Chess Championship and earned his FM title. In 2021, he won the North American Youth Chess Championship U18 category, 
                subsequently achieving his International Master title. He has also been a member of the U16 Olympiad team. 
                He has played for the Hart House Chess Club’s Pan-American Intercollegiate and Canadian University Championship teams."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Shiyam Thavandiran"
                  title="International Master"
                  image={thavandiran}
                  description="
                Shiyam started playing chess at the age of 7.  He placed 4th in the World U10 Championships and became the youngest Canadian junior champion,
                in Brantford, at the age of 12.  This was his first success in Brantford and he returned in 2015 to play in our hosting of the Ontario Open.
                There he split first prize with GM Maxim Dlugy.  We'll see if third time is a charm this year.
                In January 2012, he won the Canadian University Championship, which helped his University of Western Ontario team.
                He won the Canadian Chess Championship in April 2024, during which he went undefeated winning against GM Shawn Rodrigue-Lemieux,
                IM Raja Panjwani, IM Nikolay Noritsyn, and GM Bator Sambuev. In September 2024, he represented the country at the 45th Chess Olympiad,
                where he defeated GM Štěpán Žilka and GM Trần Tuấn Minh."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Jason Liang" 
                  title="International Master"
                  image={liang}
                  description="
                Jason Liang is an IM from upstate New York.  Born in 2007, he has held the titles of National Master since 2018,
                FIDE Master since 2019, and International Master since 2021. In 2022, he received the Arthur Award for Chess Excellence from the Eade
                Foundation. In May 2023, he was selected to receive a Samford Fellowship by the U.S. Chess Trust. He was ranked World #33 junior chess
                player by FIDE on April 1, 2023."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Anthony Atanasov"
                  title="International Master"
                  image={atanasov}
                  description="
                Born in 2008, Anthony Atanasov has been playing competitive chess in Canada since 2013!  His rise has been steady.
                In three years, his rating climbed over 1600.  By 2018, his rating first passed 2000 (he was barely 10 by this time!!).
                He has been incredibly active in the 2020's. Anthony gained the IM title in February 2024."
                />
              </CarouselItem>
            </CarouselContent>
          </AutoplayCarousel>
        </div>
        <div className="space-y-4">
          <h2 className="text-center font-bold text-xl">
            Sponsors & Donations
          </h2>
          <AutoplayCarousel
            className="w-full"
            opts={{ loop: true }}
            autoplaySpeed={6000}
          >
            <CarouselContent>
              <CarouselItem>
                <SponsorCard
                  Logo={GhentLogo}
                  description="Thank you for donating $5,000!"
                  href="https://ghentautomation.com/"
                />
              </CarouselItem>
              <CarouselItem>
                <SponsorCard Logo={HealthSpotLogo} description="" href="" />
              </CarouselItem>
            </CarouselContent>
          </AutoplayCarousel>
        </div>
      </div>
    </>
  )
}
