import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const LeaderboardPage = () => {
  return (
    <div className="font">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">1.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Alex Taylor</p>
                  <p className=" text-slate-400 text-[12px]">Level 48</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">5210</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">2.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Emma Smith</p>
                  <p className=" text-slate-400 text-[12px]">Level 46</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">5000</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">3.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://plus.unsplash.com/premium_photo-1731442837021-3929f70e1710?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFrZSUyMGElMjBwaWN0dXJlfGVufDB8fDB8fHww"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Chris Brown</p>
                  <p className=" text-slate-400 text-[12px]">Level 44</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">4500</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">4.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Sophia Jones</p>
                  <p className=" text-slate-400 text-[12px]">Level 42</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">4310</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">5.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Noah Davis</p>
                  <p className=" text-slate-400 text-[12px]">Level 40</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">4100</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">6.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Mia Walker</p>
                  <p className=" text-slate-400 text-[12px]">Level 39</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">4010</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">7.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://wallpapers.com/images/hd/cool-profile-picture-ld8f4n1qemczkrig.jpg"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Ava Martinez</p>
                  <p className=" text-slate-400 text-[12px]">Level 35</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">3810</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">8.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://media.istockphoto.com/id/843408508/photo/photography-camera-lens-concept.jpg?s=612x612&w=0&k=20&c=-tm5TKrPDMakrT1vcOE-4Rlyj-iBVdzKuX4viFkd7Vo="
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Chris Brown</p>
                  <p className=" text-slate-400 text-[12px]">Level 34</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">3310</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">9.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Alex Taylor</p>
                  <p className=" text-slate-400 text-[12px]">Level 32</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">3200</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium ml-4">10.</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={
                    "https://t4.ftcdn.net/jpg/06/44/64/49/360_F_644644908_uIYJYFIZE019oztZagHdxBOMyCfKSaHt.jpg"
                  }
                  height={200}
                  width={200}
                  alt="course"
                  className="object-cover h-10 w-10 rounded-full"
                />

                <div className="ml-2">
                  <p className="text-[14px]">Olivia Wilson</p>
                  <p className=" text-slate-400 text-[12px]">Level 30</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">3000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardPage;
