import angr, sys

proj = angr.Project('./login', load_options={'auto_load_libs': False})

init_state = proj.factory.entry_state()
simgr = proj.factory.simulation_manager(init_state)

def success(state):
    try:
        return b"Login successful" in state.posix.dumps(1)
    except:
        return False
    
def failure(state):
    try:
        return b"Login failed" in state.posix.dumps(1)
    except:
        return False

simgr.explore(find=success, avoid=failure)

if len(simgr.found) > 0:
    found = simgr.found[0]
    print(found.posix.dumps(0))
else:
    print("Not found")