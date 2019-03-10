package <%= packageName %>;

import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.ActionsSdkApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;

public class FulfillmentApp extends ActionsSdkApp {

    @ForIntent("actions.intent.MAIN")
    public ActionResponse main(ActionRequest request) {
        ResponseBuilder builder = getResponseBuilder(request);
        builder.add("Hello, world!");
        return builder.build();
    }

}
