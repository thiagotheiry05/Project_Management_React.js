import Message from "../Layout/Message"
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from "../Layout/Container"
import LinkButton from "../Layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import {useState , useEffect} from 'react'
import Loading from "../Layout/Loading"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading]= useState(false)
    const [ProjectMessage, setProjectMessage] = useState()

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:5000/projects',{
            method: 'GET', 
            headers: {
                'content-Type': 'aplication/json', 
            },
            }).then((resp)=>resp.json())
            .then((data)=>{
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
            })
            .catch((err)=>console.log(err))    
        }, 300)
    }, [])
        
    function RemoverProjects(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method : 'DELETE',
            headers: {
                'content-type': 'application/json', 
            }, 
        })
        .then((resp)=>resp.json)
        .then((data)=>{
            setProjects(projects.filter((project)=> project.id !== id))
            setProjectMessage('Projeto Removido com Sucesso')
        })
        .catch((err)=> console.log(err))
    }
    return(
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            
            {message && <Message type="sucess" msg={message}/>}
            {ProjectMessage && <Message type="sucess" msg={ProjectMessage}/>}
            <Container customClass="start">
                {projects.length>0 &&
                    projects.map((project)=> (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={RemoverProjects}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há Projetos cadastrados</p>
                )}
            </Container>
        </div>
    )

}

export default Projects