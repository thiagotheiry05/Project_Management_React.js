import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'

function NewProject(){

    const history = useNavigate()

    function creatPost(project){

        // initialize cost and services
        project.cost=0
        project.services=[]

        fetch('http://localhost:5000/projects', {
            method: "POST", 
            headers: {
                'content-Type': 'application/json'
            }, 
            body: JSON.stringify(project)
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            history('/projects',{state: {message : "Projeto criado com sucesso!"}});
        })
        .catch((err)=>{console.log(err)})
    }
    
    
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu Projeto para depois adcionar os serviços</p>
            <ProjectForm handleSubmit={creatPost} btn="Criar Projeto"/>      
        </div>
    )
}

export default NewProject