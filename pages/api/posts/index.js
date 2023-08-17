import { client } from "@/sanityClientConfig/sanity";


export default async function handler(req,res) {
    const data = await client.fetch(`*[_type=="post"] {
        ...,
        "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
        "author": author->{
          ...,
          "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
        },
      
        body[]{
          ...,
          asset->{
            ...,
            "_key": _id
          }
        }
      }`);
    res.status(200).json(data)
}