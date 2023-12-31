import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function Key() {
  const router = useRouter();
  const { key } = router.query;
  const jsonFile = [
    {
      key: "Youtube",
      link: "https://youtube.com",
    },
    {
      key: "facebook",
      link: "https://facebook.com",
    },
    {
      key: "instagram",
      link: "https://instagram.com",
    },
  ];

  const redirectURL = () => {
    const foundKey = jsonFile.find(obj => obj.key === key);
    if (foundKey) {
      router.replace(foundKey.link)
    } else {
      router.push('/404');
    }
  }
  
  useEffect(() => {
    if (key) {
      redirectURL();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <>
      <h1>Redirecting to {key}</h1>
    </>
  );
}
