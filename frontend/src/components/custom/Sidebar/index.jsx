import useAppStore from '@/store';
import SidebarFooter from './Footer';
import SidebarProfile from './Profile';
import SidebarAddTask from './AddTask';
import SidebarContent from './Content';

const Sidebar = () => {
  const {isActiveTodoSidebar} = useAppStore();
  return (

    <>
      {isActiveTodoSidebar && (
      <div className='h-screen w-72 bg-[#FDF6F6]  shadow-md'>
        
        <div className='flex flex-col h-screen'>
  {/* Sidebar Header Profile */}
  <section className='h-[58px] '>
    <SidebarProfile/>
  </section>

  {/* Sidebar Header Add Task */}
  <section className='h-[34px] '>
    <SidebarAddTask/>
  </section>

  {/* Sidebar Main Body */}
  <section className='flex-grow '>
    <SidebarContent/>
  </section>

  {/* Sidebar Footer */}
  <section className='h-[72px]'>
    <SidebarFooter/>
  </section>
</div>

    </div>
    )}
    </>
    
  )
}

export default Sidebar