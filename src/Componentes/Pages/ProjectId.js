import {parse, v4 as uuidv4} from 'uuid'
import styles from './ProjectId.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../Layout/Message'
import ServiceForm from '../project/ServiceForm'
import ServiceCard from '../project/ServiceCard'

function ProjectId(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    
    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp)=>resp.json())
            .then((data)=>{
                setProject(data)
                setServices(data.services)
            })
            .catch((err)=>console.log(err))
        },300)
    },[id])

    function editPost(project){
        setMessage('')

        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser maior que o custo total')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado')
            setType('sucess')
        })
        .catch((err)=> console.log(err))
    }

    function createService(project){

        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation 

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verfique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            setShowServiceForm(false)
        })
        .catch((err)=>console.log(err))
    }

    function ToggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function ToggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function removeservice(id, cost){

        setMessage('')
        
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso')
            setType('sucess')
        })
        .catch((err)=>console.log(err))
    }

    return (
        <>
        {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button onClick={ToggleProjectForm} className={styles.button}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria: </span>{project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btn='Concluir Edição' projectData={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adcione um Serviço: </h2>
                    <button onClick={ToggleServiceForm} className={styles.button}>
                        {!showServiceForm ? 'Adcionar Serviço' : 'Fechar Projeto'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm
                                handleSubmit={createService}
                                btn = "Adcionar Serviço"
                                projectData={project}
                            />
                        )}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass='start'>
                    {services.length>0 &&
                        services.map((service)=>(
                            <ServiceCard
                                id = {service.id}
                                name = {service.name}
                                cost = {service.cost}
                                description = {service.description}
                                key = {service.key}
                                handleRemove = {removeservice}
                            />
                        ))                    
                    }

                    {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                </Container>
            </Container>
        </div>
        ) :(
             <Loading/>
        )}
        </>
    )
}

export default ProjectId