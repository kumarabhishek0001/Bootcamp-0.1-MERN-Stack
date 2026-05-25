function App() {

  const post = [
    {
      name: "abishek",
      post: "Learning react today"
    }
  ]
  // const postComponents = post.map(p => <Post name={p.name} content={p.post} />)

  // [
  //   <Post name={post[0].name} content={post[0].post}/>,
  //   <Post name={post[0].name} content={post[1].post}/>
  // ]
  return (


    <div>
      Linkedin!!

      {post.map(p => <Post name={p.name} content={p.post} />)}

    </div>
  )
}


function Post(props) {
  return <div style={{ color: "#810B38", backgroundColor: "#F1E2D1", fontSize: 20, border: "2px solid black", margin: "15px", padding: "18px", borderRadius: "9px" }}>

    <div>
      <b>{props.name}</b>
    </div>

    <div>
      {props.content}
    </div>

  </div>
}

export default App
