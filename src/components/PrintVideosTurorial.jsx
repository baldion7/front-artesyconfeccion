export const PrintVideosTurorial = ({ response}) => {
  console.log(response)
  return (
    <>
      {response.map((item, index) => (
        <div key={index}>
          <h2>{item.Name}</h2>
          <video id="videoPlayer" controls>
            <source src={item.video_route} type="video/mp4" />
            Tu navegador no admite la reproducción de video.
          </video>
        </div>
      ))}
    </>
  );
};




