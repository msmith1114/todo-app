class Api::V1::ListItemsController < ApplicationController

    def create
        @list = List.find(params[:list_id])
        @list_item = @list.list_items.create(list_item_params)
        if @list_item.save
            render json: @list_item, status: :created
        else
            render json: @list_item.errors, status: :unprocessable_entity
        end
        
    end

    def destroy 

    end

    private

    def list_item_params
        params.require(:list_item).permit(:content)
      end
    
end
