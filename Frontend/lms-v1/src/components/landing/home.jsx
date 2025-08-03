import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <div className='header'>

                <a className="header-links" href="#landing-home" onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById('landing-home').scrollIntoView({ behavior: 'smooth' });
                }}>Home</a>
                
                <a className="header-links" href="#landing-about" onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById('landing-about').scrollIntoView({ behavior: 'smooth' });
                }}>About</a>

                <a className="header-links" href="#">Contact Us</a>
                <Link to='/login' className="header-links" >Login</Link>

                <Link to='/register' className="header-links" >Register</Link>


            </div>

            <div className='landing-container' id="landing-home">

                <div className='landing-data'>
                    <h1 id='heading'>LEARNING</h1>
                    <h4 style={{ fontFamily: 'monospace' }}>management system</h4>
                    <hr className='landing-hr' />
                    <p id='text'>
                        This Learning Management System (LMS) is your comprehensive platform to
                        simplify and enhance the entire teaching and learning journey. Whether you’re a
                        teacher managing multiple classrooms or a student keeping up with coursework,
                        the system brings everything together in one seamless experience.
                        From creating and assigning homework to tracking submissions, evaluating performance,
                        and giving personalized feedback — every task is streamlined to save time and boost productivity.


                    </p>
                </div>

                <div className='landing-image'>

                    <img src='landing.png' alt='landing-image' height={"450px"} />

                </div>


            </div>

            <div id='landing-about' data-bs-spy="scroll" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">

                <h1>About</h1>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempora quasi assumenda eveniet consectetur provident ex reiciendis, perspiciatis at laudantium iusto, vel autem reprehenderit optio animi voluptate velit itaque exercitationem veniam aliquid quis beatae. Obcaecati saepe ut laudantium beatae praesentium, amet harum veniam, quas ipsa nobis culpa autem sit, eos eaque doloremque rem quisquam. Atque saepe eos dicta consequuntur similique consequatur quaerat error quasi ut quos necessitatibus, reprehenderit modi labore voluptates voluptatibus eaque quo fugiat doloribus temporibus magni ratione odio. Illo officiis corporis qui dolor laboriosam, repellat libero eligendi omnis rerum minima quos labore magnam! Modi eius aut itaque dolor? Ratione quos illo, eum eos ducimus minus fugit nihil, omnis cum quasi deleniti, sit possimus exercitationem quibusdam saepe vitae neque! Obcaecati mollitia perspiciatis sed nihil similique, corporis, optio molestiae ratione reiciendis et dignissimos quidem veritatis dolorem officia incidunt impedit quasi! Laudantium, quaerat officia impedit odit recusandae itaque sed assumenda possimus eius quia quo quidem magni excepturi! Eaque sunt architecto adipisci maxime aliquid quas, officiis nisi suscipit possimus laborum nihil distinctio hic explicabo assumenda, temporibus eum cum voluptas nobis dicta. Omnis at soluta a corrupti labore, doloribus voluptas enim. Omnis animi autem vel iure repudiandae earum eaque! Repudiandae perspiciatis dolorum ea saepe eaque officia velit nemo commodi harum, consequatur suscipit, odit quas repellat ex asperiores in. Porro voluptas ratione reiciendis minus molestias, consectetur quaerat fugiat minima architecto aperiam sequi ut perspiciatis quia fugit est quas temporibus ab animi expedita praesentium suscipit eos deleniti. Eaque ea, blanditiis possimus officia reiciendis ullam omnis, accusantium, beatae iure repellendus sunt aperiam facilis! Eaque, alias? Praesentium nemo ullam tempora esse nulla consequuntur saepe culpa et vero, assumenda dicta fugit exercitationem dolores quasi adipisci ducimus illo similique vel consequatur explicabo iure numquam? Voluptatibus rerum aperiam officia. Sunt fuga molestiae vitae earum, aliquid numquam adipisci natus repudiandae optio illo. Commodi veniam saepe voluptatum dolorum. Odit possimus esse rem, aliquam fuga fugit, maxime, iste minus temporibus dignissimos expedita nemo tempora ab architecto asperiores? Illo facilis architecto voluptatum. Quia ipsa dicta blanditiis inventore rerum fugiat! Necessitatibus doloribus sequi ipsam omnis sapiente soluta dolor, error laudantium inventore molestias ipsum sunt hic minima at quia tenetur dignissimos officia vel eum placeat earum. Nisi culpa distinctio dolor nam suscipit voluptatem. Sit eius, autem magni recusandae possimus necessitatibus ratione fugiat ex! Nemo hic numquam quas pariatur ipsa! Labore consequuntur delectus quidem. Nostrum corrupti magni veniam soluta quia vero quasi? Fugiat quas, sunt aut dolore cupiditate praesentium sed deleniti pariatur amet dicta numquam voluptates similique debitis officiis beatae voluptate. Quasi necessitatibus voluptates minima quod nostrum accusamus assumenda cumque ut! Vel earum amet molestias nobis in eum a voluptatum dolore assumenda! Earum nulla dolorum temporibus facilis quas suscipit, rem quasi similique magni! Atque iste, distinctio alias incidunt at commodi ab totam aliquam, odit saepe aspernatur delectus, nihil officia minima voluptas repellat. Dicta tenetur illo hic perferendis temporibus numquam voluptatem iste maiores architecto pariatur commodi cupiditate magnam eius, iure optio culpa provident perspiciatis nobis suscipit? Libero vel sunt placeat qui aperiam delectus quod, cumque minima incidunt voluptatem!</p>

            </div>

        </div>
    )
}
